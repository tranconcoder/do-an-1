import { ConvertObjectIdToString } from '../modules/mongoose';

declare global {
    namespace joiTypes {
        module auth {
            interface UserSchema
                extends moduleTypes.mongoose
                    .ConvertObjectIdToString<modelTypes.auth.UserSchema> {}

            interface LoginSchema
                extends Pick<UserSchema, 'phoneNumber' | 'password'> {}

            interface SignUpSchema
                extends Pick<
                    UserSchema,
                    'email' | 'fullName' | 'password' | 'phoneNumber' | 'role'
                > {}

            interface NewTokenSchema {
                refreshToken: string;
            }
        }
    }
}
