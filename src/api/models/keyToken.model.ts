import { InferRawDocType, Schema, model } from 'mongoose';

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
		type: [{ type: String, required: true }],
		default: [],
	},
	refresh_tokens: {
		type: [{ type: String, required: true }],
		default: [],
	},
};

const keyTokenSchema = new Schema(keyTokenSchemaDefinition, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
	collection: KEY_TOKEN_COLLECTION_NAME,
});

export type KeyTokenModel = InferRawDocType<typeof keyTokenSchemaDefinition>;

export default model(KEY_TOKEN_MODEL_NAME, keyTokenSchema);
