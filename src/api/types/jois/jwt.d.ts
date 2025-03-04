import { JwtPayload as JwtPayloadBase } from 'jsonwebtoken';

declare global {
    namespace joiTypes {
        namespace jwt {
            /* ====================================================== */
            /*                       DEFINITION                       */
            /* ====================================================== */
            namespace definition {
                interface JwtPayloadSign
                    extends serviceTypes.jwt.definition.JwtPayloadSign {}

                interface JwtPayload
                    extends JwtPayloadSign,
                        Required<Pick<JwtPayloadBase, 'iat' | 'exp'>> {}
            }
        }
    }
}
