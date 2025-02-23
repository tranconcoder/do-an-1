import { Schema, model } from 'mongoose';

export const USER_MODEL_NAME = 'User';
export const COLLECTION_NAME = 'users';

const userSchema = new Schema(
	{
		phoneNumber: {
			type: String,
			length: 10,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: {
			updatedAt: 'updated_at',
			createdAt: 'created_at',
		},
	}
);

export default model(USER_MODEL_NAME, userSchema, COLLECTION_NAME);
