import { InferRawDocType, Schema, model } from 'mongoose';
import { KEY_TOKEN_MODEL_NAME } from './keyToken.model';

export const KEY_TOKEN_ITEM_MODEL_NAME = 'KeyTokenItem';
export const KEY_TOKEN_ITEM_COLLECTION_NAME = 'key_token_items';

const keyTokenItemSchemaDefinition = {
	id: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	refreshToken: {
		type: String,
		required: true,
	},
};

const keyTokenItemSchema = new Schema(keyTokenItemSchemaDefinition, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
	collection: KEY_TOKEN_ITEM_COLLECTION_NAME,
});

export type KeyTokenItemDocument = InferRawDocType<
	typeof keyTokenItemSchemaDefinition
>;

export default model(KEY_TOKEN_ITEM_MODEL_NAME, keyTokenItemSchema);
