import type { ObjectAnyKeys } from '../types/object';
import type { SignUpSchema } from '../validations/joi/signUp.joi';

// Libs
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
import { JwtPair } from '../types/jwt';
import { LoginSchema } from '../validations/joi/login.joi';

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
		if (jwtTokenPair === null) {
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

			// Throw error
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
	}: LoginSchema): Promise<JwtPair> => {
		/* ------------------- Prepare error ------------------ */
		const error = new ForbiddenErrorResponse(
			'Phone number or password is incorrect!',
			false
		);

		/* -------------- Check if user is exists ------------- */
		const user = await UserService.findOneUser({ phoneNumber });
		if (!user) throw error;

		/* ------------------ Check password ------------------ */
		const hashPassword = user.password;
		const isPasswordMatch = await bcrypt.compare(password, hashPassword);
		if (!isPasswordMatch) throw error;

		/* --------- Generate token and send response --------- */
		const { private_key } = await KeyTokenService.getTokenByUserId(user._id);
		const jwtTokenPair = await JwtService.generateJwtPair({
			privateKey: private_key,
			payload: {
				userId: user._id.toString(),
				role: user.role.toString(),
			},
		});
		if (!jwtTokenPair) throw error;

		/* ------ Save jwt token pair to key token model ------ */
		const saveNewTokenSuccess = await KeyTokenService.saveNewJwtToken({
			userId: user._id.toString(),
			...jwtTokenPair,
		});
		if (!saveNewTokenSuccess) throw error;

        return jwtTokenPair;
	};

	/* ===================================================== */
	/*                         LOGOUT                        */
	/* ===================================================== */
	public static logout = async () => {
	}
}
