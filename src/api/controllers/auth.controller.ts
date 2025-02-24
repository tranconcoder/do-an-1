import { KEY_TOKEN_COLLECTION_NAME } from './../models/keyToken.model';
import type { RequestHandler } from 'express';
import AuthService from '../services/auth.service';
import SuccessResponse, {
	CreatedResponse,
	OkResponse,
} from '../response/success.response';

export default class AuthController {
	/* ===================================================== */
	/*                        SIGN UP                        */
	/* ===================================================== */
	public static signUp: RequestHandler = async (req, res, next) => {
		new CreatedResponse({
			message: 'Sign up success!',
			metadata: await AuthService.signUp(req.body),
		}).send(res);
	};

	/* ===================================================== */
	/*                         LOGIN;                        */
	/* ===================================================== */
	public static login: RequestHandler = async (req, res, next) => {
		new OkResponse({
			message: 'Login success!',
			metadata: await AuthService.login(req.body),
		});
	};
}
