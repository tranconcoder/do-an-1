import { ConvertObjectIdToString } from '../modules/mongoose';

declare global {
    namespace joiTypes {
        module auth {
            interface UserSchema extends modelTypes.auth.UserSchema {}

            interface LoginSchema
                extends Pick<UserSchema, 'phoneNumber' | 'password'> {}

            interface SignUpSchema
                extends moduleTypes.mongoose.ConvertObjectIdToString<
                    Omit<UserSchema, 'dateOfBirth'>
                > {}

            interface NewTokenSchema {
                refreshToken: string;
            }
        }
    }
}
