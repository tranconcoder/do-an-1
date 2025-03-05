import '';

declare global {
    namespace serviceTypes {
        namespace user {
            /* ====================================================== */
            /*                        ARGUMENTS                       */
            /* ====================================================== */
            namespace arguments {
                interface NewInstanceArgs extends modelTypes.auth.UserSchema {}
            }
        }
    }
}
