import {
	JwtPayload,
	PrivateKey,
} from './../../../node_modules/@types/jsonwebtoken/index.d';

type PublicKey = string;
type PrivateKey = PublicKey;

export interface JwtSignPayload {
	userId: string;
	role: string;
}

export interface JwtGenerateOptions {
	privateKey: PrivateKey;
	payload: JwtSignPayload;
}

export interface JwtPair {
	accessToken: string;
	refreshToken: string;
}
