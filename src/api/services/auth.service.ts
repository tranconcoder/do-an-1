import { NotFoundErrorResponse } from '../response/error.response';
import { ObjectAnyKeys } from '../types/object';
import type { SignUpSchema } from '../validations/joi/signUp.joi';

export default class AuthService {
	public static signUp = async ({
		phoneNumber,
		email,
		password,
		fullName,
	}: SignUpSchema): Promise<ObjectAnyKeys> => {
		return {
			accessToken: '123',
			refreshToken: '234',
		};
	};
}
