declare global {
    namespace serviceTypes {
        namespace auth {
            namespace definition {
                interface LoginResponse {
                    user: Pick<
                        modelTypes.auth.UserSchema<true>,
                        'phoneNumber' | 'email' | 'fullName' | 'role' | '_id'
                    >;
                    token: serviceTypes.jwt.definition.JwtPair;
                }
            }
        }
    }
}
