import '';

declare global {
    module joiTypes {
        module product {
            /* ====================================================== */
            /*                       DEFINITION                       */
            /* ====================================================== */
            interface PhoneSchema
                extends moduleTypes.mongoose.ConvertObjectIdToString<
                    Omit<modelTypes.product.PhoneSchema, 'product_shop'>
                > {}

            interface ClothesSchema
                extends moduleTypes.mongoose.ConvertObjectIdToString<
                    Omit<modelTypes.product.ClothesSchema, 'product_shop'>
                > {}

            /* ====================================================== */
            /*                         CREATE                         */
            /* ====================================================== */
            interface CreateProductSchema
                extends Omit<
                    modelTypes.product.ProductSchema,
                    'product_shop' | 'product_rating_avg' | 'product_slug'
                > {}

            interface DeleteProductSchema
                extends Pick<
                    modelTypes.product.ProductSchema,
                    'product_category'
                > {
                product_id: string;
            }
        }
    }
}
