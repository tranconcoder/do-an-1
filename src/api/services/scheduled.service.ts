import {
    CLEAN_UP_KEY_TOKEN_CRON_TIME,
    CLEAN_UP_KEY_TOKEN_TIMEZONE
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
    private static handleCleanUpKeyToken = async () => {
        try {
            const allKeyTokens = await keyTokenModel.find();
            let refreshTokenUsedDeletedCount = 0;

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

                    refreshTokenUsedDeletedCount +=
                        keyToken.refresh_tokens_used.length -
                        newRefreshTokensUsed.length;
                    keyToken.set('refresh_tokens_used', newRefreshTokensUsed);

                    return true;
                })
            ).then((resultList) => {
                const deletedRowCount = resultList.filter(
                    (x) => x.status === 'rejected'
                ).length;

                LoggerService.getInstance().info(
                    `Cleanup key token: ${deletedRowCount} key token cleaned`
                );
                LoggerService.getInstance().info(
                    `Cleanup key token: ${refreshTokenUsedDeletedCount} refresh token used cleaned`
                );
            });
        } catch (error) {
            const message = error?.toString() || 'Error: cleanup key token';
            LoggerService.getInstance().error(message);
        }
    };

    public static cleanUpKeyTokenCronJob = CronJob.from({
        cronTime: CLEAN_UP_KEY_TOKEN_CRON_TIME,
        timeZone: CLEAN_UP_KEY_TOKEN_TIMEZONE,
        start: false,
        waitForCompletion: true,
        onTick: ScheduledService.handleCleanUpKeyToken
    });
}
