import type { ObjectAnyKeys } from '../types/object';
import type { SignUpSchema } from '../validations/joi/signUp.joi';

// Libs
import mongoose from 'mongoose';

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
		/* ------------------------------------------------------ */
		/*                 Check if user is exists                */
		/* ------------------------------------------------------ */
		const userIsExist = await UserService.checkUserExist({
			$or: [{ phoneNumber }, { email }],
		});
		if (userIsExist) throw new NotFoundErrorResponse('User is exists!');

		/* ------------------------------------------------------ */
		/*                Save new user to database               */
		/* ------------------------------------------------------ */
		const userSaved = await UserService.saveUser({
			phoneNumber,
			email,
			password,
			fullName,
			role: new mongoose.Types.ObjectId(),
		});
		if (!userSaved) throw new ForbiddenErrorResponse('Create user failed!');

		/* ------------------------------------------------------ */
		/*               Generate key and jwt token               */
		/* ------------------------------------------------------ */
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

		/* ------------------------------------------------------ */
		/*               Save key token to database               */
		/* ------------------------------------------------------ */
		const keySaved = await KeyTokenService.saveKeyToken({
			user: userSaved.id,
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
}
