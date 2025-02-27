import { UserModel } from '../models/user.model';
import { JwtPair } from './jwt';

/* ===================================================== */
/*                       RESPONSE                        */
/* ===================================================== */

export interface LoginResponse {
    user: Pick<UserModel, 'phoneNumber' | 'email' | 'fullName' | 'role'> & {
        _id: ObjectId;
    };
    token: JwtPair;
}
