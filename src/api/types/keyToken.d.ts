import { KeyTokenModel } from '../models/keyToken.model';

export interface KeyTokenPair {
	publicKey: string;
	privateKey: string;
}

export type SaveKeyTokenArgs = {
	[key in 'userId' | 'privateKey' | 'publicKey' | 'refreshToken']: string;
};
export interface ReplaceRefreshTokenWithNewArgs {
	userId: string;
	refreshToken: string;
	oldRefreshToken: string;
}
