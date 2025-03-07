import '';
import { CategoryEnum } from '../../enums/product.enum';

declare global {
    module joiTypes {
        module product {
            /* ====================================================== */
            /*                       DEFINITION                       */
            /* ====================================================== */
            namespace definition {
                /* ====================================================== */
                /*                         CREATE                         */
                /* ====================================================== */
                interface CreatePhoneSchema
                    extends moduleTypes.mongoose.ConvertObjectIdToString<
                        Omit<modelTypes.product.PhoneSchema, 'product_shop'>
                    > {}

                interface CreateClothesSchema
                    extends moduleTypes.mongoose.ConvertObjectIdToString<
                        Omit<modelTypes.product.ClothesSchema, 'product_shop'>
                    > {}

                interface CreateProductSchema
                    extends Omit<
                        modelTypes.product.ProductSchema,
                        | 'product_shop'
                        | 'product_rating_avg'
                        | 'product_slug'
                        | 'product_attributes'
                        | '_id'
                    > {
                    product_attributes: modelTypes.product.ProductUnion;
                }

                /* ====================================================== */
                /*                         GET ALL                        */
                /* ====================================================== */
                interface GetAllProductByShopSchema {
                    currentPage: number;
                }

                interface GetAllProductDraftByShopSchema
                    extends GetAllProductByShopSchema {}

                interface GetAllProductPublishByShopSchema
                    extends GetAllProductByShopSchema {}

                interface GetAllProductUndraftByShopSchema
                    extends GetAllProductByShopSchema {}

                interface GetAllProductUnpublishByShopSchema
                    extends GetAllProductByShopSchema {}

                /* ====================================================== */
                /*                         UPDATE                         */
                /* ====================================================== */
                interface UpdatePhoneSchema
                    extends commonTypes.utils
                        .PartialNested<CreatePhoneSchema> {}

                interface UpdateClothesSchema
                    extends commonTypes.utils
                        .PartialNested<CreateClothesSchema> {}

                interface UpdateProductSchema
                    extends commonTypes.utils.PartialWithout<
                        CreateProductSchema,
                        'product_category'
                    > {
                    product_id: string;
                    product_new_category?: CategoryEnum;
                }

                /* ====================================================== */
                /*                         DELETE                         */
                /* ====================================================== */
                interface DeleteProductSchema {
                    product_id: string;
                }
            }
        }

        /* ====================================================== */
        /*                        VALIDATE                        */
        /* ====================================================== */
        namespace validate {
            interface ClothesSchemaRequiredKeys
                extends Array<
                    commonTypes.utils.RequiredKeys<product.CreateClothesSchema>
                > {}
        }
    }
}
