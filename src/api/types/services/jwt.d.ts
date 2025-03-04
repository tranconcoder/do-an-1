import type { SignOptions } from 'jsonwebtoken';

declare global {
    namespace serviceTypes {
        namespace jwt {
            /* ====================================================== */
            /*                       DEFINITION                       */
            /* ====================================================== */
            namespace definition {
                interface KeyTokenPair {
                    publicKey: string;
                    privateKey: string;
                }

                interface JwtPair {
                    accessToken: string;
                    refreshToken: string;
                }

                interface JwtPayloadSign
                    extends moduleTypes.mongoose.ConvertObjectIdToString<
                        Pick<modelTypes.auth.UserSchema<true>, 'role'>
                    > {
                    id: string;
                }
            }

            namespace utils {
                interface ReplaceRefreshTokenWithNewArgs {
                    userId: string;
                    refreshToken: string;
                    oldRefreshToken: string;
                }

                type JwtConfig = {
                    [key in keyof serviceTypes.jwt.definition.JwtPair]: {
                        options: SignOptions;
                    };
                };
            }
        }
    }
}
