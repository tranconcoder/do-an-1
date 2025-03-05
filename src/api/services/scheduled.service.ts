import {
    CLEAN_UP_KEY_TOKEN_CRON_TIME,
    CLEAN_UP_PRODUCT_CRON_TIME,
    getCronOptions
} from './../../configs/scheduled.config';

// Models
import keyTokenModel from '../models/keyToken.model';
import { productModel } from '../models/product.model';

// Services
import JwtService from './jwt.service';
import LoggerService from './logger.service';

// Libs
import { CronCallback, CronJob, CronOnCompleteCallback } from 'cron';
import { asyncFilter } from '../utils/array.utils';
import mongoose from 'mongoose';
import { CategoryEnum } from '../enums/product.enum';

export default class ScheduledService {
    public static startScheduledService = () => {
        this.cleanUpKeyTokenCronJob.start();
        this.cleanUpProductCronJob.start();
    };

    /* ===================================================== */
    /*          CLEANUP KEY TOKEN EXPIRED OR BANNED          */
    /* ===================================================== */

    private static handleCleanUpKeyToken = async () => {
        const allKeyTokens = await keyTokenModel.find();

        /* -------------------- Reset counter ------------------- */
        let keyTokenCleaned = 0,
            refeshTokenUsedCleaned = 0;

        await Promise.allSettled(
            allKeyTokens.map(async (keyToken) => {
                const decoded = await JwtService.verifyJwt({
                    token: keyToken.refresh_token,
                    publicKey: keyToken.public_key
                });

                if (!decoded) {
                    await keyToken.deleteOne();
                    throw new Error('Invalid key token');
                }

                const newRefreshTokensUsed = await asyncFilter(
                    keyToken.refresh_tokens_used,
                    async (refreshTokenUsed) => {
                        const payload =
                            JwtService.parseJwtPayload(refreshTokenUsed);

                        if (!payload) return false;
                        if (payload.exp * 1000 <= Date.now()) return false;

                        return true;
                    }
                );

                refeshTokenUsedCleaned +=
                    keyToken.refresh_tokens_used.length -
                    newRefreshTokensUsed.length;

                keyToken.set('refresh_tokens_used', newRefreshTokensUsed);

                await keyToken.save();

                return true;
            })
        )
            .then((resultList) => {
                keyTokenCleaned = resultList.filter(
                    (x) => x.status === 'rejected'
                ).length;
            })
            .then(() => {
                LoggerService.getInstance().info(
                    `Cleanup key token: ${keyTokenCleaned} key token cleaned`
                );
                LoggerService.getInstance().info(
                    `Cleanup key token: ${refeshTokenUsedCleaned} refresh token used cleaned`
                );
            });
    };

    /* ===================================================== */
    /*                CLEANUP PRODUCT DATA                   */
    /* ===================================================== */
    private static handleCleanUpProduct = async () => {
        /* ----------------- Get product id list ---------------- */
        const productIds = new Set(
            (
                await productModel.aggregate().project({
                    _id: { $toString: '$_id' }
                })
            ).map((x: { _id: string }) => x._id)
        );

        /* -------------- Get product child id list ------------- */
        const productChildModelName = Object.values(CategoryEnum);
        const productChildsList = await Promise.all(
            productChildModelName.map(async (modelName) => {
                const model = mongoose.model(modelName);
                if (!model) throw new Error(`Model '${modelName}' not found`);

                const childList = await model.find().select('_id').lean();

                return childList.map((x: any) => x._id.toString());
            })
        );

        /* --------------- Clean in product model --------------- */
        const productChildSet = new Set(productChildsList.flat());
        const productDiffence = productIds.difference(productChildSet);

        await Promise.all([
            productModel.deleteMany({
                _id: { $in: Array.from(productDiffence) }
            }),
            ...productChildsList.map(async (childList, index) => {
                const childSet = new Set(childList);
                const diffence = childSet.difference(productIds);
                const model = mongoose.model(productChildModelName[index]);

                return await model.deleteMany({
                    _id: { $in: Array.from(diffence) }
                });
            })
        ]).then((results) => {
            const { deletedCount } = results.flat().reduce(
                (a, b) => ({
                    deletedCount: a.deletedCount + b.deletedCount
                }),
                { deletedCount: 0 }
            );

            LoggerService.getInstance().info(
                `Cleanup product: Cleaned ${deletedCount} products`
            );
        });
    };

    /* ====================================================== */
    /*                        CRON JOBS                       */
    /* ====================================================== */
    public static cleanUpKeyTokenCronJob = CronJob.from(
        getCronOptions({
            cronTime: CLEAN_UP_KEY_TOKEN_CRON_TIME,
            onTick: ScheduledService.handleCleanUpKeyToken,
            onComplete: () => {}
        })
    );
    public static cleanUpProductCronJob = CronJob.from(
        getCronOptions({
            cronTime: CLEAN_UP_PRODUCT_CRON_TIME,
            onTick: ScheduledService.handleCleanUpProduct
        })
    );
}
