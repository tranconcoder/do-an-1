declare global {
    namespace serviceTypes {
        namespace key {
            namespace defination {
                type PublicKey = string;
                type PrivateKey = PublicKey;
            }

            namespace utils {
                type SaveKeyTokenArgs = {
                    [key in
                        | 'userId'
                        | 'privateKey'
                        | 'publicKey'
                        | 'refreshToken']: string;
                };
            }
        }
    }
}
