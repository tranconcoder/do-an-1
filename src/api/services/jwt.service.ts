import type {
	JwtPair,
	JwtSignArgs,
	JwtSignPayload,
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
	public static verifyJwt = ({
		token,
		publicKey,
	}: JwtVerityArgs): JwtSignPayload | null => {
		try {
			const decoded = jwt.verify(token, publicKey);

			return decoded as JwtSignPayload;
		} catch (error) {
			return null;
		}
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
