import {
	CLEAN_UP_KEY_TOKEN_CRON_TIME,
	CLEAN_UP_KEY_TOKEN_TIMEZONE,
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
			let count = 0;

			for (const keyToken of allKeyTokens) {
				if (keyToken.refresh_tokens.length === 0) {
					keyTokenModel.deleteOne({ _id: keyToken._id });
					continue;
				}

				/* ------------------ Initial value ------------------ */
				const { public_key, refresh_tokens } = keyToken;

				/* ------------------ Handle cleanup ----------------- */
				const refreshTokensCleaned = await asyncFilter(
					refresh_tokens,
					async (token) => {
						const isTokenValid = !!(await JwtService.verifyJwt({
							token,
							publicKey: public_key,
						}));
						if (!isTokenValid) count++;

						return isTokenValid;
					}
				);

				/* ------------------ Save to database ----------------- */
				keyToken.set('refresh_tokens', refreshTokensCleaned);

				await keyToken.save();
			}

			LoggerService.getInstance().info(
				`Cleanup key token: ${count} tokens cleaned`
			);
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
		onTick: ScheduledService.handleCleanUpKeyToken,
	});
}
