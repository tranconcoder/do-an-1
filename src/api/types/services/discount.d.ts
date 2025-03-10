import '';

declare global {
    namespace serviceTypes {
        namespace discount {
            /* ---------------------------------------------------------- */
            /*                         Arguments                          */
            /* ---------------------------------------------------------- */
            namespace arguments {
                interface CreateDiscount
                    extends joiTypes.discount.CreateDiscount {
                    userId: string;
                }
            }
        }
    }
}
