import type {
	JwtPair,
	JwtSignArgs,
	JwtSignPayload,
	JwtVerifyPairArgs,
	JwtVerityArgs,
} from '../types/jwt';

import {
	ACCESS_TOKEN_SIGN_OPTIONS,
	REFRESH_TOKEN_SIGN_OPTIONS,
} from '../../configs/jwt.config';
import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
import { jwtSignAsync } from '../utils/jwt.util';
import LoggerService from './logger.service';
import { ForbiddenErrorResponse } from '../response/error.response';

export default class JwtService {
	/* ================================================== */
	/*          GENERATE REFRESH TOKEN AND ACCESS         */
	/* ================================================== */
	public static generateJwtPair = async ({
		privateKey,
		payload,
	}: JwtSignArgs): Promise<JwtPair | null> => {
		try {
			const [accessToken, refreshToken] = await Promise.all([
				jwtSignAsync(payload, privateKey, ACCESS_TOKEN_SIGN_OPTIONS),
				jwtSignAsync(payload, privateKey, REFRESH_TOKEN_SIGN_OPTIONS),
			]);

			return {
				accessToken,
				refreshToken,
			};
		} catch (error: any) {
			LoggerService.getInstance().error(
				error?.toString() || 'Error while generating jwt pair'
			);
			return null;
		}
	};

	/* ================================================== */
	/*                  VERIFY JWT TOKEN                  */
	/* ================================================== */
	public static verifyJwt = async ({
		token,
		publicKey,
	}: JwtVerityArgs): Promise<JwtSignPayload | null> => {
		return new Promise((resolve) => {
			jwt.verify(token, publicKey, (error, decoded) => {
				if (error) resolve(null);
				else resolve(decoded as JwtSignPayload);
			});
		});
	};
	public static verifyJwtPair = async ({
		accessToken,
		refreshToken,
		publicKey,
	}: JwtVerifyPairArgs) => {
		const [decodedAccessToken, decodedRefreshToken] = await Promise.all([
			this.verifyJwt({ token: accessToken, publicKey }),
			this.verifyJwt({ token: refreshToken, publicKey }),
		]);

		if (
			decodedAccessToken?.userId !== decodedRefreshToken?.userId ||
			decodedAccessToken?.role !== decodedRefreshToken?.role
		) {
			throw new ForbiddenErrorResponse(
				"Access token and refresh token don't match"
			);
		}

		return decodedAccessToken as JwtSignPayload;
	};

	/* ================================================== */
	/*                 PARSE TOKEN PAYLOAD                */
	/* ================================================== */
	public static parseJwtPayload = (token: string): JwtSignPayload | null => {
		try {
			return jwtDecode<JwtSignPayload>(token);
		} catch (error) {
			LoggerService.getInstance().error(
				error?.toString() || 'Error while parsing jwt payload'
			);
			return null;
		}
	};
}
