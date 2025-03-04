declare global {
    namespace serviceTypes {
        namespace jwt {
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
                    extends Pick<
                        modelTypes.auth.UserSchema,
                        'email' | 'role'
                    > {}
            }

            namespace utils {
                interface ReplaceRefreshTokenWithNewArgs {
                    userId: string;
                    refreshToken: string;
                    oldRefreshToken: string;
                }

                type JwtConfig = {
                    [key in keyof JwtPair]: {
                        options: SignOptions;
                    };
                };
            }
        }
    }
}
