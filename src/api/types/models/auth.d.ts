import mongoose, { Document } from 'mongoose';
import { joiTypes } from '../joi';

declare global {
    namespace modelTypes {
        namespace auth {
            type UserSchema<D = false> = moduleTypes.mongoose.IsDocument<D> & {
                phoneNumber: string;
                password: string;
                email: string;
                fullName: string;
                role: mongoose.Types.ObjectId;
                dayOfBirth?: Date;
            };
        }
    }
}
