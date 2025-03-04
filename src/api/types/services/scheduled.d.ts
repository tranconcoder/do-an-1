declare global {
    namespace serviceTypes {
        namespace scheduled {
            /* ====================================================== */
            /*                   FUNCTION ARGUMENTS                   */
            /* ====================================================== */
            namespace arguments {
                type GetCronOptionPayload = Parameters<typeof CronJob.from>[0];
            }
        }
    }
}
