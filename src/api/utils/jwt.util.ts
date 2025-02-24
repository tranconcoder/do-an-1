import { JwtPayload, PrivateKey, SignOptions } from 'jsonwebtoken';
import { JwtSignPayload } from '../types/jwt';

// JWT
import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';

export const jwtSignAsync = async (
	payload: JwtPayload,
	privateKey: PrivateKey,
	options: SignOptions
): Promise<string> => {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, privateKey, options, (err, token) => {
			if (err || !token) {
				return reject(err);
			}

			resolve(token);
		});
	});
};

export const jwtParse = (token: string): JwtSignPayload | null => {
	try {
		return jwtDecode<JwtSignPayload>(token);
	} catch (error) {
		return null;
	}
};
