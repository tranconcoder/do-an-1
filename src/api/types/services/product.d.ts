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
                    extends Partial<
                            Omit<
                                moduleTypes.mongoose.ConvertObjectIdToString<modelTypes.product.ProductSchema>,
                                'product_rating_avg' | 'product_slug'
                            >
                        >,
                        Partial<
                            Pick<
                                joiTypes.product.definition.UpdateProductSchema,
                                'product_new_category' | 'product_id'
                            >
                        > {}
            }

            /* ====================================================== */
            /*                   FUNCTION ARGUMENTS                   */
            /* ====================================================== */
            namespace arguments {
                /* ------------------- Create product ------------------- */
                interface CreateProduct extends definition.Product {}

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
