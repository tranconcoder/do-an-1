import type { JwtPayload as JwtDecodePayload } from 'jwt-decode';
import { JwtPayloadSchema } from '../validations/joi/jwt.joi';
import {
    JwtPayload,
    PrivateKey,
    SignOptions
} from './../../../node_modules/@types/jsonwebtoken/index.d';

export namespace jwtTypes {
    module definition {
        type PublicKey = string;
        type PrivateKey = PublicKey;

        interface JwtPair {
            accessToken: string;
            refreshToken: string;
        }
    }
    module arguments {
        interface JwtSignArgs {
            privateKey: PrivateKey;
            payload: JwtPayloadSchema;
            type: keyof JwtPair;
        }

        interface JwtSignPairArgs extends Omit<JwtSignArgs, 'type'> {}

        interface JwtVerityArgs {
            token: string;
            publicKey: PublicKey;
        }

        interface JwtVerifyPairArgs extends JwtPair {
            publicKey: PublicKey;
        }
    }
}

type JwtConfig = {
    [key in keyof JwtPair]: {
        options: SignOptions;
    };
};
