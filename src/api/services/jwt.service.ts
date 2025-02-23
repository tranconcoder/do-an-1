import { JwtGenerateOptions } from '../types/jwt';
import {
	ACCESS_TOKEN_SIGN_OPTIONS,
	REFRESH_TOKEN_SIGN_OPTIONS,
} from '../../configs/jwt.config';
import { jwtSignAsync } from '../utils/jwt.util';

export default class JwtService {
	public static generateJwtPair = async ({
		privateKey,
		payload,
	}: JwtGenerateOptions) => {
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
}
