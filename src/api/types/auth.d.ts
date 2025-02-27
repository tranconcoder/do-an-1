import { UserModel } from '../models/user.model';
import { JwtPair } from './jwt';

/* ===================================================== */
/*                       RESPONSE                        */
/* ===================================================== */

export interface LoginResponse {
	user: UserModel;
	token: JwtPair;
}
