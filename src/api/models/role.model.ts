import { Schema, model } from 'mongoose';
import { required, unique } from '../helpers/mongooseKeyWord.helper';

export const ROLE_MODEL_NAME = 'Role';
export const ROLE_COLLECTION_NAME = 'roles';

const roleSchema = new Schema(
    {
        name: { type: String, required, unique },
        description: { type: String }
    },
    {
        timestamps: {
            updatedAt: 'updated_at',
            createdAt: 'created_at'
        }
    }
);

export default model(ROLE_MODEL_NAME, roleSchema, ROLE_COLLECTION_NAME);
