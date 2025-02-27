import { UserModel } from '../models/user.model';
import { JwtPair } from './jwt';

/* ===================================================== */
/*              SERVICE ARGUMENT TYPE                    */
/* ===================================================== */

/* ===================================================== */
/*                       RESPONSE                        */
/* ===================================================== */

export interface LoginResponse {
	user: UserModel;
	token: JwtPair;
}
