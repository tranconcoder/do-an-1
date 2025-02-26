import { JwtPayloadSchema } from './../validations/joi/jwt.joi';
import { JwtPayload, PrivateKey, SignOptions } from 'jsonwebtoken';

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

export const jwtParse = (token: string): JwtPayloadSchema | null => {
	try {
		return jwtDecode<JwtPayloadSchema>(token);
	} catch (error) {
		return null;
	}
};
