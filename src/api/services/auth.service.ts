import type { ObjectAnyKeys } from '../types/object';
import type { LoginSchema, SignUpSchema } from '../validations/joi/auth.joi';
import type { JwtPair } from '../types/jwt';

// Libs
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import _ from 'lodash';

// Handle error
import {
	NotFoundErrorResponse,
	ForbiddenErrorResponse,
} from '../response/error.response';

// Configs
import { BCRYPT_SALT_ROUND } from './../../configs/bcrypt.config';

// Services
import UserService from './user.service';
import KeyTokenService from './keyToken.service';
import JwtService from './jwt.service';
import { LoginResponse, NewTokenArgs } from '../types/auth';

export default class AuthService {
	/* ===================================================== */
	/*                        SIGN UP                        */
	/* ===================================================== */
	public static signUp = async ({
		phoneNumber,
		email,
		password,
		fullName,
	}: SignUpSchema): Promise<ObjectAnyKeys> => {
		/* --------------- Check if user is exists -------------- */
		const userIsExist = await UserService.checkUserExist({
			$or: [{ phoneNumber }, { email }],
		});
		if (userIsExist) throw new NotFoundErrorResponse('User is exists!');

		/* ------------- Save new user to database ------------ */
		const hashPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUND);
		const userSaved = await UserService.saveUser({
			phoneNumber,
			email,
			password: hashPassword,
			fullName,
			role: new mongoose.Types.ObjectId(),
		});
		if (!userSaved) throw new ForbiddenErrorResponse('Create user failed!');

		/* ------------ Generate key and jwt token ------------ */
		const { privateKey, publicKey } = KeyTokenService.generateTokenPair();
		const jwtTokenPair = await JwtService.generateJwtPair({
			privateKey,
			payload: {
				userId: userSaved.id,
				role: userSaved.role.toString(),
			},
		});
		if (!jwtTokenPair) {
			// Clean up user saved
			UserService.removeUser(userSaved.id);
			throw new ForbiddenErrorResponse('Generate jwt token failed!');
		}

		/* ------------ Save key token to database ------------ */
		const keySaved = await KeyTokenService.saveKeyToken({
			userId: userSaved.id,
			privateKey,
			publicKey,
			...jwtTokenPair,
		});
		if (!keySaved) {
			// Clean up user saved
			UserService.removeUser(userSaved.id);
			throw new ForbiddenErrorResponse('Save key token failed!');
		}

		return jwtTokenPair;
	};

	/* ===================================================== */
	/*                         LOGIN                         */
	/* ===================================================== */
	public static login = async ({
		phoneNumber,
		password,
	}: LoginSchema): Promise<LoginResponse> => {
		/* -------------- Check if user is exists ------------- */
		const user = await UserService.findOne({ phoneNumber });
		if (!user) throw new NotFoundErrorResponse('User not found!');

		/* ------------------ Check password ------------------ */
		const hashPassword = user.password;
		const isPasswordMatch = await bcrypt.compare(password, hashPassword);
		if (!isPasswordMatch)
			throw new ForbiddenErrorResponse('Password is wrong!');

		/* --------- Generate token and send response --------- */
		const { privateKey, publicKey } = KeyTokenService.generateTokenPair();
		const jwtPair = await JwtService.generateJwtPair({
			privateKey,
			payload: {
				userId: user._id.toString(),
				role: user.role.toString(),
			},
		});
		if (!jwtPair)
			throw new ForbiddenErrorResponse('Generate jwt token failed!');

		/* ---------------- Save new key token ---------------- */
		const keyTokenId = await KeyTokenService.saveKeyToken({
			userId: user._id.toString(),
			privateKey,
			publicKey,
			...jwtPair,
		});
		if (!keyTokenId) throw new ForbiddenErrorResponse('Save key token failed!');

		return {
			user: user,
			token: jwtPair,
		};
	};

	/* ===================================================== */
	/*                         LOGOUT                        */
	/* ===================================================== */
	public static logout = async (userId: string) => {
		/* ----- Handle remove refresh token in valid list ---- */
		return await KeyTokenService.deleteKeyTokenByUserId(userId);
	};

	/* ===================================================== */
	/*                       NEW TOKEN                       */
	/* ===================================================== */
	public static newToken = async ({ refreshToken, type }: NewTokenArgs) => {
		/* -------------- Get user info in token -------------- */
		const payload = JwtService.parseJwtPayload(refreshToken);
		if (!payload)
			throw new ForbiddenErrorResponse('Token is not generate by server!');

		/* ------------- Find key token by user id ------------ */
		const keyToken = await KeyTokenService.findTokenByUserId(payload.userId);
		if (!keyToken) throw new NotFoundErrorResponse('Token not found!');

		/* --------------- Verify refresh token --------------- */
		const decoded = await JwtService.verifyJwt({
			publicKey: keyToken.public_key,
			token: refreshToken,
		});
		if (!decoded) throw new ForbiddenErrorResponse('Token is invalid!');

		/* --------- Check refresh token in valid list -------- */
		const isTokenInValidList = keyToken.refresh_tokens.includes(refreshToken);
		if (!isTokenInValidList) {
			// ALERT: Token was stolen!!!
			// Clean up keyToken
			KeyTokenService.deleteKeyTokenByUserId(payload.userId);

			throw new ForbiddenErrorResponse('Token was deleted!');
		}

		/* ---------------- Generate new token ---------------- */
		const token = await JwtService.generateJwt({
			privateKey: keyToken.private_key,
			payload: _.pick(decoded, ['userId', 'role']),
			type: type,
		});
		if (!token) throw new ForbiddenErrorResponse('Generate token failed!');

		/* ------- Save new refresh token to valid list ------- */
		if (type === 'refreshToken') {
			KeyTokenService.replaceRefreshTokenWithNew({
				userId: decoded.userId,
				refreshToken: token,
				oldRefreshToken: refreshToken,
			});
		}

		return {
			[type]: token,
		};
	};
}
