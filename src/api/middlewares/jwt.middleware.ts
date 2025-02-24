import { RequestHandler } from 'express';
import { ForbiddenErrorResponse } from '../response/error.response';
import catchError from './catchError.middleware';
import JwtService from '../services/jwt.service';
import KeyTokenService from '../services/keyToken.service';

export const checkAuth: RequestHandler = catchError(async (req, res, next) => {
	const error = new ForbiddenErrorResponse('Permission denied!', false);

	/* -------------- Get token from header ------------- */
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ').at(1);
	if (!token) throw error;

	/* --------------- Parse token payload -------------- */
	const payloadParse = JwtService.parseJwtPayload(token);
	if (!payloadParse || !payloadParse.userId) throw error;

	/* ------------------ Verify token ------------------ */
	const {
		public_key: publicKey,
		access_tokens: accessTokens,
		access_tokens_banned: accessTokensBanned,
	} = await KeyTokenService.getTokenByUserId(payloadParse.userId);

	/* ------------ Check token in whitelist ------------ */
	if (!publicKey || token in accessTokensBanned || !(token in accessTokens))
		throw error;

	const payload = JwtService.verifyJwt({ token, publicKey });
	if (!payload) throw error;

	/* --------------- Attach payload to req ------------ */
	req.userId = payload.userId;

	next();
});
