export const TIMEZONE = 'Asia/Ho_Chi_Minh';

// Cleanup key token scheduled
export const CLEAN_UP_KEY_TOKEN_CRON_TIME = '* * * * *';

// Cleanup product remove failed scheduled
export const CLEAN_UP_PRODUCT_CRON_TIME = '0 0 */3 * *';

export const getCronOptions = (
    options: serviceTypes.scheduled.GetCronOptionArgs
) => {
    return {
        timeZone: TIMEZONE,
        start: false,
        waitForCompletion: true,
        ...options
    } as serviceTypes.scheduled.GetCronOptionArgs;
};
