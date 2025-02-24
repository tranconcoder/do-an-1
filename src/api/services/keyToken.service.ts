import crypto from 'crypto';
import keyTokenModel, { KeyTokenModel } from '../models/keyToken.model';
import { ObjectAnyKeys } from '../types/object';
import mongoose from 'mongoose';
import { SaveKeyTokenArgs, SaveNewJwtTokenArgs } from '../types/keyToken';
export default class KeyTokenService {
	public static getTokenByUserId = async (
		userId: string | mongoose.Types.ObjectId
	): Promise<KeyTokenModel | ObjectAnyKeys> => {
		const keyToken = await keyTokenModel.findOne({ user: userId }).lean();

		return keyToken ? keyToken : {};
	};

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

	public static saveNewJwtToken = async ({
		userId,
		accessToken,
		refreshToken,
	}: SaveNewJwtTokenArgs) => {
		const updateResult = await keyTokenModel.updateOne(
			{
				user: userId,
			},
			{
				$push: {
					access_tokens: {
						token: accessToken,
					},
					refresh_tokens: {
						token: refreshToken,
					},
				},
			}
		);

		return updateResult.modifiedCount > 0;
	};

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
