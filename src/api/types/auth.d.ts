import { UserModel } from '../models/user.model';
import { JwtPair } from './jwt';

export interface LoginResponse {
	user: UserModel;
	token: JwtPair;
}
