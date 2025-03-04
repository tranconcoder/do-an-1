import { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace joiTypes {
        module jwt {
            interface JwtPayloadSign {
                userId: string;
                role: string;
            }

            interface JwtPayloadSignWithHeader
                extends JwtPayloadSign,
                    Required<Pick<JwtPayload, 'iat' | 'exp'>> {}
        }
    }
}
