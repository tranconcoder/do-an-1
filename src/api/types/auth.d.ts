import type { UserSchema } from './models/user';
import type { JwtPair } from './jwt';

/* ===================================================== */
/*                       RESPONSE                        */
/* ===================================================== */

export interface LoginResponse {
    user: Pick<UserSchema, 'phoneNumber' | 'email' | 'fullName' | 'role'> & {
        _id: ObjectId;
    };
    token: JwtPair;
}
