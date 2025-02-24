import { SaveKeyTokenArgs, SaveNewJwtTokenArgs } from '../types/keyToken';
import { ObjectAnyKeys } from '../types/object';

// Libs
import crypto from 'crypto';
import mongoose from 'mongoose';

// Models
import keyTokenModel, { KeyTokenModel } from '../models/keyToken.model';

export default class KeyTokenService {
	/* ===================================================== */
	/*                  GET TOKEN BY USER ID                 */
	/* ===================================================== */
	public static getTokenByUserId = async (
		userId: string | mongoose.Types.ObjectId
	): Promise<KeyTokenModel | ObjectAnyKeys> => {
		const keyToken = await keyTokenModel.findOne({ user: userId }).lean();

		return keyToken ? keyToken : {};
	};

	/* ===================================================== */
	/*            SAVE NEW KEY TOKEN WHEN SIGN UP            */
	/* ===================================================== */
	public static saveKeyToken = async ({
		userId,
		privateKey,
		publicKey,
		accessToken,
		refreshToken,
	}: SaveKeyTokenArgs) => {
		const keyToken = await keyTokenModel.create({
			user: userId,
			private_key: privateKey,
			public_key: publicKey,
			access_tokens: [{ token: accessToken }],
			refresh_tokens: [{ token: refreshToken }],
		});

		return keyToken._id;
	};

	/* ===================================================== */
	/*           SAVE NEW TOKEN GENERATED ON LOGIN           */
	/* ===================================================== */
	public static saveNewJwtToken = async ({
		userId,
		accessToken,
		refreshToken,
	}: SaveNewJwtTokenArgs) => {
		const updateResult = await keyTokenModel.updateOne(
			{ user: userId },
			{
				$push: {
					access_tokens: { token: accessToken },
					refresh_tokens: { token: refreshToken },
				},
			}
		);

		return updateResult.modifiedCount > 0;
	};

	/* ===================================================== */
	/*             GENERATE TOKEN PAIR ON SIGN UP            */
	/* ===================================================== */
	public static generateTokenPair = () => {
		return crypto.generateKeyPairSync('rsa', {
			modulusLength: 4096,
			publicKeyEncoding: {
				type: 'spki',
				format: 'pem',
			},
			privateKeyEncoding: {
				type: 'pkcs8',
				format: 'pem',
			},
		});
	};
}
