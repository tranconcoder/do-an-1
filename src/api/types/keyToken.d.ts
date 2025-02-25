import { KeyTokenModel } from '../models/keyToken.model';

export interface KeyTokenPair {
	publicKey: string;
	privateKey: string;
}

export type SaveKeyTokenArgs = {
	[key in
		| 'userId'
		| 'privateKey'
		| 'publicKey'
		| 'accessToken'
		| 'refreshToken']: string;
};
export interface SaveNewJwtTokenArgs {
	userId: string;
	accessToken: string;
	refreshToken: string;
}

export interface RemoveRefreshTokenArgs {
	userId: string;
	refreshToken: string;
}
