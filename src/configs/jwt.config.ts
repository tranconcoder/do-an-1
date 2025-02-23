import { JwtPayload, SignOptions } from 'jsonwebtoken';

export const ACCESS_TOKEN_SIGN_OPTIONS: SignOptions = {
	expiresIn: 15 * 60, // 15 minutes
	algorithm: 'RS256',
};
export const REFRESH_TOKEN_SIGN_OPTIONS: SignOptions = {
	expiresIn: 24 * 60 * 60, // 1 day
	algorithm: 'RS512',
};
