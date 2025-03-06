import '';

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
                            modelTypes.product.ProductSchema,
                            'product_rating_avg' | 'product_slug'
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
                    // product_attributes: modelTypes.product.ProductSchemaList;
                    _id: mongoose.Types.ObjectId;
                }

                /* ------------------- Remove product ------------------- */
                type RemoveProduct =
                    joiTypes.product.definition.DeleteProductSchema['product_id'];
            }
        }
    }
}
