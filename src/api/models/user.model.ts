import { InferRawDocType, Schema, model } from 'mongoose';
import { ROLE_MODEL_NAME } from './role.model';
import { required, unique } from '../helpers/mongooseKeyWord.helper';

export const USER_MODEL_NAME = 'User';
export const USER_COLLECTION_NAME = 'users';

const userSchemaDefinition = {
    phoneNumber: { type: String, length: 10, required, unique },
    email: { type: String, unique },
    password: { type: String, required },
    fullName: { type: String, required },
    role: { type: Schema.Types.ObjectId, required, ref: ROLE_MODEL_NAME },
    dayOfBirth: Date
} as const;
const userSchema = new Schema(userSchemaDefinition, {
    collection: USER_COLLECTION_NAME,
    timestamps: {
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    }
});

const userModel = model(USER_MODEL_NAME, userSchema);

export type UserModel = InferRawDocType<typeof userSchemaDefinition>;

export default userModel;
