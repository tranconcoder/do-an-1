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
                    > {
                    product_attributes: modelTypes.product.ProductUnion;
                }

                /* ====================================================== */
                /*                         GET ALL                        */
                /* ====================================================== */
                interface GetAllProductByShopSchema {
                    itemPerPage: number;
                    currentPage: number;
                }

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
                    extends Partial<
                            Omit<CreateProductSchema, 'product_category'>
                        >,
                        Pick<CreateProductSchema, 'product_category'> {
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
