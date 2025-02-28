import { InferRawDocType, Schema, model } from 'mongoose';
import { required } from '../helpers/mongooseKeyWord.helper';
import { USER_MODEL_NAME } from './user.model';

export const KEY_TOKEN_MODEL_NAME = 'KeyToken';
export const KEY_TOKEN_COLLECTION_NAME = 'key_tokens';

const keyTokenSchemaDefinition = {
    user: { type: Schema.Types.ObjectId, require, ref: USER_MODEL_NAME },
    private_key: { type: String, required },
    public_key: { type: String, required },
    refresh_token: { type: String, required }
};

const keyTokenSchema = new Schema(keyTokenSchemaDefinition, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: KEY_TOKEN_COLLECTION_NAME
});

export type KeyTokenModel = InferRawDocType<typeof keyTokenSchemaDefinition>;

export default model(KEY_TOKEN_MODEL_NAME, keyTokenSchema);
