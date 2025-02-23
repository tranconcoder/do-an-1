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
		// Create new user
		//
		const userId = await UserService.createUser({
			phoneNumber,
			email,
			password,
			fullName,
			role: new mongoose.Types.ObjectId('123'),
		});
		if (!userId) throw new ForbiddenErrorResponse('Create user failed!');

		//
		// Generate key pair
		//

		return {
			accessToken: '123',
			refreshToken: '234',
		};
	};
}
