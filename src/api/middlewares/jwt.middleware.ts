import { RequestHandler } from 'express';
import {
	ForbiddenErrorResponse,
	NotFoundErrorResponse,
} from '../response/error.response';
import catchError from './catchError.middleware';
import JwtService from '../services/jwt.service';
import KeyTokenService from '../services/keyToken.service';

export const checkAuth: RequestHandler = catchError(async (req, res, next) => {
	/* -------------- Get token from header ------------- */
	const authHeader = req.headers.authorization;
	const accessToken = authHeader && authHeader.split(' ').at(1);
	if (!accessToken) throw new NotFoundErrorResponse('Token not found!');

	/* --------------- Parse token payload -------------- */
	const payloadParsed = JwtService.parseJwtPayload(accessToken);
	if (!payloadParsed || !payloadParsed.userId)
		throw new ForbiddenErrorResponse('Invalid token payload!');

	/* -------------- Check token is valid -------------- */
	const keyToken = await KeyTokenService.getTokenByUserId(payloadParsed.userId);
	if (!keyToken) throw new ForbiddenErrorResponse('Invalid token!');

	const {
		public_key: publicKey,
		access_tokens: accessTokens,
		access_tokens_banned: accessTokensBanned,
	} = keyToken;

	/* ------------ Check token in blacklist ------------ */
	const isTokenBanned = accessToken in accessTokensBanned;
	if (isTokenBanned) throw new ForbiddenErrorResponse('Token is banned!');

	/* ------------ Check token in token list ------------ */
	const isTokenValid = accessTokens.some(
		({ token }: { token: string }) => accessToken === token
	);
	if (!isTokenValid) throw new ForbiddenErrorResponse('Token is removed!');

	/* ------------ Check token in whitelist ------------ */
	const payload = JwtService.verifyJwt({ token: accessToken, publicKey });
	if (!payload) throw new ForbiddenErrorResponse('Can not verify token!');

	/* --------------- Attach payload to req ------------ */
	req.userId = payload.userId;

	next();
});
