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

export default class ScheduledService {
    /* ===================================================== */
    /*          CLEANUP KEY TOKEN EXPIRED OR BANNED          */
    /* ===================================================== */
    private static handleCleanUpKeyToken = async () => {
        try {
            const allKeyTokens = await keyTokenModel.find();

            await Promise.allSettled(
                allKeyTokens.map(async (keyToken) => {
                    const decoded = await JwtService.verifyJwt({
                        token: keyToken.refresh_token,
                        publicKey: keyToken.public_key
                    });

                    if (decoded) {
                        return true;
                    } else {
                        await keyToken.deleteOne();
                        throw false;
                    }
                })
            ).then((resultList) => {
                const deletedCount = resultList.filter(
                    (x) => x.status === 'rejected'
                ).length;
                LoggerService.getInstance().info(
                    `Cleanup key token: ${deletedCount} tokens cleaned`
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
