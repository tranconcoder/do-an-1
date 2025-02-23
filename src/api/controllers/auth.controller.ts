import type { RequestHandler } from 'express';
import AuthService from '../services/auth.service';
import { CreatedResponse } from '../response/success.response';

export default class AuthController {
	public static signUp: RequestHandler = async (req, res, next) => {
		new CreatedResponse({
			message: 'Sign up success!',
			metadata: await AuthService.signUp(req.body),
		}).send(res);
	};
}
