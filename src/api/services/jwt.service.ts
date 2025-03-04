import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
import { jwtSignAsync } from '../utils/jwt.util';
import LoggerService from './logger.service';
import jwtConfig from '../../configs/jwt.config';

export default class JwtService {
    /* ================================================== */
    /*          GENERATE REFRESH TOKEN AND ACCESS         */
    /* ================================================== */
    public static signJwt = async ({
        privateKey,
        payload,
        type
    }: serviceTypes.jwt.arguments.JwtSignArgs) => {
        try {
            const { options } = jwtConfig[type];
            return await jwtSignAsync(payload, privateKey, options);
        } catch (error: any) {
            LoggerService.getInstance().error(
                error?.toString() || 'Error while generating jwt'
            );
            return null;
        }
    };
    public static signJwtPair = async ({
        privateKey,
        payload
    }: serviceTypes.jwt.arguments.JwtSignPairArgs): Promise<serviceTypes.jwt.definition.JwtPair | null> => {
        try {
            const [accessToken, refreshToken] = await Promise.all([
                jwtSignAsync(
                    payload,
                    privateKey,
                    jwtConfig.accessToken.options
                ),
                jwtSignAsync(
                    payload,
                    privateKey,
                    jwtConfig.refreshToken.options
                )
            ]);

            return {
                accessToken,
                refreshToken
            };
        } catch (error: any) {
            LoggerService.getInstance().error(
                error?.toString() || 'Error while generating jwt pair'
            );
            return null;
        }
    };

    /* ================================================== */
    /*                  VERIFY JWT TOKEN                  */
    /* ================================================== */
    public static verifyJwt = async ({
        token,
        publicKey
    }: serviceTypes.jwt.arguments.JwtVerityArgs): Promise<null> => {
        return new Promise((resolve) => {
            jwt.verify(token, publicKey, (error: any, decoded: any) => {
                if (error) resolve(null);
                else resolve(decoded as modelTypes.keyToken.JwtPayloadSign);
            });
        });
    };

    /* ================================================== */
    /*                 PARSE TOKEN PAYLOAD                */
    /* ================================================== */
    public static parseJwtPayload = (
        token: string
    ): JwtPayloadWithHeaderSchema | null => {
        try {
            const payload = jwtDecode<JwtPayloadWithHeaderSchema>(token);
            const { error: joiError, value } =
                jwtPayloadWithHeaderSchema.validate(payload);

            if (joiError) {
                // Alert to admin have a hacker
                LoggerService.getInstance().error(
                    `Token is not generate by server: ${token}`
                );

                throw joiError;
            }

            return value;
        } catch (error) {
            LoggerService.getInstance().error(
                error?.toString() || 'Error while parsing jwt payload'
            );
            return null;
        }
    };
}
