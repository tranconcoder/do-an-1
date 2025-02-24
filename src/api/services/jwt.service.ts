import jwt, { JwtPayload } from 'jsonwebtoken';
import { JwtSignArgs, JwtSignPayload, JwtVerityArgs } from '../types/jwt';
import {
	ACCESS_TOKEN_SIGN_OPTIONS,
	REFRESH_TOKEN_SIGN_OPTIONS,
} from '../../configs/jwt.config';
import { jwtSignAsync } from '../utils/jwt.util';

export default class JwtService {
	public static generateJwtPair = async ({
		privateKey,
		payload,
	}: JwtSignArgs) => {
		try {
			const [accessToken, refreshToken] = await Promise.all([
				jwtSignAsync(payload, privateKey, ACCESS_TOKEN_SIGN_OPTIONS),
				jwtSignAsync(payload, privateKey, REFRESH_TOKEN_SIGN_OPTIONS),
			]);

			console.log('accessToken', accessToken);
			console.log('refreshToken', refreshToken);

			return {
				accessToken,
				refreshToken,
			};
		} catch (error) {
			return null;
		}
	};

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
}
