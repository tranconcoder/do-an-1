// Libs
import crypto from 'crypto';
import mongoose from 'mongoose';

// Models
import keyTokenModel from '../models/keyToken.model';

export default class KeyTokenService {
    /* ===================================================== */
    /*                  GET TOKEN BY USER ID                 */
    /* ===================================================== */
    public static findTokenByUserId = async (userId: string) => {
        const id = new mongoose.Types.ObjectId(userId);
        return await keyTokenModel.findOne({ user: id });
    };

    /* ===================================================== */
    /*            SAVE NEW KEY TOKEN WHEN SIGN UP            */
    /* ===================================================== */
    public static findOneAndReplace = async ({
        userId,
        privateKey,
        publicKey,
        refreshToken
    }: serviceTypes.key.arguments.SaveKeyToken) => {
        const keyToken = await keyTokenModel.findOneAndReplace(
            {
                user: userId
            },
            {
                user: userId,
                private_key: privateKey,
                public_key: publicKey,
                refresh_token: refreshToken
            },
            {
                upsert: true,
                returnDocument: 'after'
            }
        );

        return keyToken ? keyToken._id : null;
    };

    /* ===================================================== */
    /*           		SAVE NEW TOKEN GENERATED 		  */
    /* ===================================================== */
    public static replaceRefreshTokenWithNew = async ({
        userId,
        refreshToken,
        oldRefreshToken
    }: serviceTypes.key.arguments.ReplaceRefreshTokenWithNew) => {
        const updateResult = await keyTokenModel.updateOne(
            { user: userId, 'refresh_tokens.$': oldRefreshToken },
            {
                $set: {
                    'refresh_tokens.$': refreshToken
                }
            }
        );

        return updateResult.modifiedCount > 0;
    };

    /* ===================================================== */
    /*             GENERATE TOKEN PAIR ON SIGN UP            */
    /* ===================================================== */
    public static generateTokenPair = () => {
        return crypto.generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        });
    };

    /* ===================================================== */
    /*                  REMOVE REFRESH TOKEN                 */
    /* ===================================================== */
    public static deleteKeyTokenByUserId = async (userId: string) => {
        return await keyTokenModel.deleteOne({
            user: userId
        });
    };
}
