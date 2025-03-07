import '';
import { CategoryEnum } from '../../enums/product.enum';

declare global {
    namespace serviceTypes {
        namespace product {
            /* ====================================================== */
            /*                       DEFINITION                       */
            /* ====================================================== */
            namespace definition {
                interface Product
                    extends Partial<modelTypes.product.ProductSchema>,
                        Partial<
                            Pick<
                                joiTypes.product.definition.UpdateProductSchema,
                                'product_new_category'
                            >
                        > {}
            }

            /* ====================================================== */
            /*                   FUNCTION ARGUMENTS                   */
            /* ====================================================== */
            namespace arguments {
                /* ------------------- Create product ------------------- */
                interface CreateProduct extends definition.Product {}

                /* --------------- Get all product by shop -------------- */
                interface GetAllProductByShop
                    extends joiTypes.product.definition
                            .GetAllProductByShopSchema,
                        Pick<
                            modelTypes.product.ProductSchema,
                            'product_shop'
                        > {}

                interface GetAllProductDraftByShop
                    extends GetAllProductByShop {}

                interface GetAllProductPublishByShop
                    extends GetAllProductByShop {}

                interface GetAllProductUndraftByShop
                    extends GetAllProductByShop {}

                interface GetAllProductUnpublishByShop
                    extends GetAllProductByShop {}

                /* ------------------- Update product ------------------- */
                interface UpdateProduct
                    extends joiTypes.product.definition.UpdateProductSchema {
                    product_attributes: modelTypes.product.ProductSchemaList;
                    product_shop: string;
                }

                /* ------------------- Remove product ------------------- */
                type RemoveProduct =
                    joiTypes.product.definition.DeleteProductSchema['product_id'];
            }
        }
    }
}
