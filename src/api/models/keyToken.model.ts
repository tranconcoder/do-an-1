import { InferRawDocType, Schema, model } from 'mongoose';

export const KEY_TOKEN_MODEL_NAME = 'KeyToken';
export const KEY_TOKEN_COLLECTION_NAME = 'key_tokens';

const keyTokenSchemaDefinition = {
	user_id: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	refresh_token: {
		type: [
			{
				type: String,
				required: true,
				expires: 100,
			},
		],
	},
	refresh_token_black_list: {
		type: Array,
		required: true,
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
