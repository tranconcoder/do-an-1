import { SaveKeyTokenArgs, SaveNewJwtTokenArgs } from '../types/keyToken';

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
		userId: string
	): Promise<KeyTokenModel | null> => {
		const id = new mongoose.Types.ObjectId(userId);
		return await keyTokenModel.findOne({ user: id });
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
		const keyToken = await keyTokenModel.findOneAndReplace(
			{
				user: userId,
			},
			{
				user: userId,
				private_key: privateKey,
				public_key: publicKey,
				access_tokens: [accessToken],
				refresh_tokens: [refreshToken],
			},
			{
				upsert: true,
				returnDocument: 'after',
			}
		);

		return keyToken ? keyToken._id : null;
	};

	/* ===================================================== */
	/*           		SAVE NEW TOKEN GENERATED 		  */
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
					access_tokens: accessToken,
					refresh_tokens: refreshToken,
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

	/* ===================================================== */
	/*                  REMOVE REFRESH TOKEN                 */
	/* ===================================================== */
	public static removeKeyTokenByUserId = async (userId: string) => {
		return await keyTokenModel.deleteOne({
			user: userId,
		});
	};
}
