import { UserModel } from '../models/user.model';
import { JwtPair } from './jwt';

/* ===================================================== */
/*              SERVICE ARGUMENT TYPE                    */
/* ===================================================== */
export interface NewTokenArgs {
    refreshToken: string;
    type: keyof JwtPair;
}

/* ===================================================== */
/*                       RESPONSE                        */
/* ===================================================== */

export interface LoginResponse {
	user: UserModel;
	token: JwtPair;
}
