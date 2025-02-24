import mongoose, { InferRawDocType, Schema, model } from 'mongoose';
import KeyTokenService from '../services/keyToken.service';
import {
	ACCESS_TOKEN_SIGN_OPTIONS,
	REFRESH_TOKEN_SIGN_OPTIONS,
} from '../../configs/jwt.config';
import JwtService from '../services/jwt.service';

export const KEY_TOKEN_MODEL_NAME = 'KeyToken';
export const KEY_TOKEN_COLLECTION_NAME = 'key_tokens';

const keyTokenSchemaDefinition = {
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	private_key: {
		type: String,
		required: true,
	},
	public_key: {
		type: String,
		required: true,
	},
	access_tokens: {
		type: [
			{
				token: {
					type: String,
					required: true,
				},
				expired_at: {
					type: Date,
					default: () =>
						new Date(
							Date.now() +
								(ACCESS_TOKEN_SIGN_OPTIONS.expiresIn as number) * 1000
						),
				},
			},
		],
		default: [],
	},
	refresh_tokens: {
		type: [
			{
				token: {
					type: String,
					required: true,
				},
				expired_at: {
					type: Date,
					default: () =>
						new Date(
							Date.now() +
								(REFRESH_TOKEN_SIGN_OPTIONS.expiresIn as number) * 1000
						),
				},
			},
		],
		default: [],
	},
	refresh_tokens_banned: {
		type: [String],
		default: [],
	},
	access_tokens_banned: {
		type: [String],
		default: [],
	},
};

const keyTokenSchema = new Schema(keyTokenSchemaDefinition, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
	collection: KEY_TOKEN_COLLECTION_NAME,
	statics: {
		cleanUpInvalidTokens: async function () {},
	},
});

export type KeyTokenModel = InferRawDocType<typeof keyTokenSchemaDefinition>;

export default model(KEY_TOKEN_MODEL_NAME, keyTokenSchema);
