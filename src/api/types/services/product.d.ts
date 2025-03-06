import '';

declare global {
    namespace serviceTypes {
        namespace product {
            /* ====================================================== */
            /*                       DEFINITION                       */
            /* ====================================================== */
            namespace definition {}

            /* ====================================================== */
            /*                   FUNCTION ARGUMENTS                   */
            /* ====================================================== */
            namespace arguments {
                /* ------------------- Create product ------------------- */
                interface CreateProduct
                    extends Omit<
                        modelTypes.product.ProductSchema,
                        'product_rating_avg' | 'product_slug'
                    > {}

                /* ------------------- Update product ------------------- */
                interface UpdateProduct
                    extends joiTypes.product.definition.UpdateProductSchema {
                    // product_attributes: modelTypes.product.ProductSchemaList;
                }

                /* ------------------- Remove product ------------------- */
                type RemoveProduct =
                    joiTypes.product.definition.DeleteProductSchema['product_id'];
            }
        }
    }
}
