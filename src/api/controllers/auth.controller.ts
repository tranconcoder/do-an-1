import type { RequestHandler } from 'express';
import AuthService from '../services/auth.service';
import { CreatedResponse, OkResponse } from '../response/success.response';
import { HandleRefreshTokenSchema } from '../validations/joi/auth.joi';
import { HandleRefreshTokenArgs } from '../types/auth';

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
	/*                         LOGIN                         */
	/* ===================================================== */
	public static login: RequestHandler = async (req, res, next) => {
		new OkResponse({
			message: 'Login success!',
			metadata: await AuthService.login(req.body),
		}).send(res);
	};

	/* ===================================================== */
	/*                         LOGOUT                        */
	/* ===================================================== */
	public static logout: RequestHandler = async (req, res, next) => {
		await AuthService.logout(req.userId || '');

		new OkResponse({
			name: 'Logout',
			message: 'Logout success!',
		}).send(res);
	};

	/* ===================================================== */
	/*                  HANDLE REFRESH TOKEN                 */
	/* ===================================================== */
	public static handleRefreshToken: RequestHandler<
		any,
		any,
		HandleRefreshTokenArgs
	> = async (req, res, next) => {
		new OkResponse({
			message: 'Get new token pair success!',
			metadata: await AuthService.handleRefreshToken(req.body),
		}).send(res);
	};
}
