import { CLEAN_UP_KEY_TOKEN_SCHEDULED } from './../../configs/scheduled.config';
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
	public static cleanUpKeyToken = CronJob.from({
		cronTime: CLEAN_UP_KEY_TOKEN_SCHEDULED,
		start: false,
		timeZone: 'Asia/Ho_Chi_Minh',
		waitForCompletion: true,
		onTick: async () => {
			const allKeyTokens = await keyTokenModel.find();

			allKeyTokens.forEach(async (keyToken) => {
				const { id, refresh_tokens } = keyToken;

				try {
					const validRefreshTokens = refresh_tokens.filter((token) => {
						// Check expired time
						const { expired_at: expired_at, token: refreshToken } = token;
						const now = new Date();

						if (now > expired_at) return false;

						// Check jwt valid
						return !!JwtService.verifyJwt({
							token: refreshToken,
							publicKey: keyToken.public_key,
						});
					});

					keyToken.set('refresh_tokens', validRefreshTokens);
					await keyToken.save();
				} catch (error: any) {
					const message =
						error?.toString() ||
						`Error: can't verify refresh token of key token ${id}`;

					LoggerService.getInstance().error(message);
				}
			});
		},
	});
}
