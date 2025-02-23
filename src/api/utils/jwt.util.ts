import jwt, { JwtPayload, PrivateKey, SignOptions } from 'jsonwebtoken';
import { StringOrUndefined } from '../types/string';

export const jwtSignAsync = async (
	payload: JwtPayload,
	privateKey: PrivateKey,
	options: SignOptions
): Promise<StringOrUndefined> => {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, privateKey, options, (err, token) => {
			console.log(err);
			if (err) {
				return reject(err);
			}

			console.log('token', token);

			resolve(token);
		});
	});
};
