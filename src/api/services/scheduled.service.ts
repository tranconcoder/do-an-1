import {
    CLEAN_UP_KEY_TOKEN_CRON_TIME,
    CLEAN_UP_PRODUCT_CRON_TIME,
    getCronOptions,
    TIMEZONE
} from './../../configs/scheduled.config';
// Models
import keyTokenModel from '../models/keyToken.model';

// Services
import JwtService from './jwt.service';
import LoggerService from './logger.service';

// Libs
import { CronJob } from 'cron';
import { asyncFilter } from '../utils/array.utils';

export default class ScheduledService {
    /* ===================================================== */
    /*          CLEANUP KEY TOKEN EXPIRED OR BANNED          */
    /* ===================================================== */
    private static keyTokenCleaned = 0;
    private static refeshTokenUsedCleaned = 0;

    private static handleCleanUpKeyToken = async () => {
        const allKeyTokens = await keyTokenModel.find();

        /* -------------------- Reset counter ------------------- */
        this.refeshTokenUsedCleaned = 0;
        this.keyTokenCleaned = 0;

        await Promise.allSettled(
            allKeyTokens.map(async (keyToken) => {
                const decoded = await JwtService.verifyJwt({
                    token: keyToken.refresh_token,
                    publicKey: keyToken.public_key
                });

                if (!decoded) {
                    await keyToken.deleteOne();
                    throw false;
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

                this.refeshTokenUsedCleaned +=
                    keyToken.refresh_tokens_used.length -
                    newRefreshTokensUsed.length;
                keyToken.set('refresh_tokens_used', newRefreshTokensUsed);

                return true;
            })
        ).then((resultList) => {
            this.keyTokenCleaned = resultList.filter(
                (x) => x.status === 'rejected'
            ).length;
        });
    };

    /* ===================================================== */
    /*                CLEANUP PRODUCT DATA                   */
    /* ===================================================== */
    private static handleCleanUpProduct = async () => {};

    public static cleanUpKeyTokenCronJob = CronJob.from(
        getCronOptions({
            cronTime: CLEAN_UP_KEY_TOKEN_CRON_TIME,
            onTick: ScheduledService.handleCleanUpKeyToken,
            errorHandler: (error) => {
                const message = error?.toString() || 'Error: cleanup key token';
                LoggerService.getInstance().error(message);
            },
            onComplete: () => {
                LoggerService.getInstance().info(
                    `Cleanup key token: ${this.keyTokenCleaned} key token cleaned`
                );
                LoggerService.getInstance().info(
                    `Cleanup key token: ${this.refeshTokenUsedCleaned} refresh token used cleaned`
                );
            }
        })
    );
    public static cleanUpProductCronJob = CronJob.from(
        getCronOptions({
            cronTime: CLEAN_UP_PRODUCT_CRON_TIME,
            onTick: ScheduledService.handleCleanUpProduct
        })
    );
}
