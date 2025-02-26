import {JwtPayloadSchema} from '../validations/joi/jwt.joi';
import {
	JwtPayload,
	PrivateKey,
    SignOptions,
} from './../../../node_modules/@types/jsonwebtoken/index.d';

type PublicKey = string;
type PrivateKey = PublicKey;

type JwtConfig = {
    [key in keyof JwtPair]: {
        options: SignOptions;
    }
}


/* ====================================================== */
/*                   SIGN NEW JWT TYPES                   */
/* ====================================================== */
export interface JwtSignArgs {
	privateKey: PrivateKey;
	payload: JwtPayloadSchema;
    type: keyof JwtPair
}
export interface JwtSignPairArgs extends Omit<JwtSignArgs, "type"> {
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

