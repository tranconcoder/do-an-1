import '';

declare global {
    namespace joiTypes {
        namespace discount {
            /* -------------------- Create discount  -------------------- */
            interface CreateDiscount
                extends Omit<
                    modelTypes.discount.DiscountSchema,
                    'is_admin_voucher' | 'discount_shop'
                > {}
        }
    }
}
