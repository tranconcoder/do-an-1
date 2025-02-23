import type { ObjectAnyKeys } from '../types/object';
import type { SignUpSchema } from '../validations/joi/signUp.joi';

// Libs
import mongoose from 'mongoose';
import crypto from 'crypto';

// Handle error
import {
	NotFoundErrorResponse,
	ForbiddenErrorResponse,
} from '../response/error.response';

// Services
import UserService from './user.service';
import KeyTokenService from './keyToken.service';
import JwtService from './jwt.service';

export default class AuthService {
	public static signUp = async ({
		phoneNumber,
		email,
		password,
		fullName,
	}: SignUpSchema): Promise<ObjectAnyKeys> => {
		//
		// Check if user is exists
		//
		const userExist = await UserService.checkUserExist({
			$or: [{ phoneNumber }, { email }],
		});
		if (userExist) throw new NotFoundErrorResponse('User is exists!');

		//
		// Save new user to database
		//
		const user = await UserService.saveUser({
			phoneNumber,
			email,
			password,
			fullName,
			role: new mongoose.Types.ObjectId(),
		});
		if (!user) throw new ForbiddenErrorResponse('Create user failed!');

		//
		// Generate key and jwt token
		//
		const { privateKey, publicKey } = KeyTokenService.generateTokenPair();
		const jwtTokenPair = await JwtService.generateJwtPair({
			privateKey,
			payload: {
				userId: user.id,
				role: user.role.toString(),
			},
		});
		if (jwtTokenPair === null) {
			throw new ForbiddenErrorResponse('Generate jwt token failed!');
		}

		//
		// Save key token to database
		//
		const keySaved = await KeyTokenService.saveKeyToken({
			user: user.id,
			privateKey,
			publicKey,
			...jwtTokenPair,
		});
		if (!keySaved) {
			// Clean up user saved
			await UserService.removeUser(user.id);

			// Throw error
			throw new ForbiddenErrorResponse('Save key token failed!');
		}

		return jwtTokenPair;
	};
}
