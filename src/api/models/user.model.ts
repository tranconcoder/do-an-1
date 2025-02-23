import { InferRawDocType, Schema, model } from 'mongoose';
import { ROLE_COLLECTION_NAME } from './role.model';

export const USER_MODEL_NAME = 'User';
export const USER_COLLECTION_NAME = 'users';

const userSchemaDefinition = {
	phoneNumber: {
		type: String,
		length: 10,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	fullName: {
		type: String,
		required: true,
	},
	dayOfBirth: Date,
	role: {
		type: Schema.Types.ObjectId,
		ref: ROLE_COLLECTION_NAME,
		default: null,
		required: true,
	},
} as const;
const userSchema = new Schema(userSchemaDefinition, {
	collection: USER_COLLECTION_NAME,
	timestamps: {
		updatedAt: 'updated_at',
		createdAt: 'created_at',
	},
});

const userModel = model(USER_MODEL_NAME, userSchema, USER_COLLECTION_NAME);

export type UserModel = InferRawDocType<typeof userSchemaDefinition>;

export default userModel;
