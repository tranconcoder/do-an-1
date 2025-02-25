import {
	JwtPayload,
	PrivateKey,
} from './../../../node_modules/@types/jsonwebtoken/index.d';

type PublicKey = string;
type PrivateKey = PublicKey;

/* ====================================================== */
/*                   SIGN NEW JWT TYPES                   */
/* ====================================================== */
export interface JwtSignPayload {
	userId: string;
	role: string;
}

export interface JwtSignArgs {
	privateKey: PrivateKey;
	payload: JwtSignPayload;
}

/* ====================================================== */
/*                    VERIFY JWT TYPES                    */
/* ====================================================== */
export interface JwtVerityArgs {
	token: string;
	publicKey: PublicKey;
}

export interface JwtVerifyPairArgs extends JwtPair {
	publicKey: PublicKey;
}

export interface JwtPair {
	accessToken: string;
	refreshToken: string;
}
