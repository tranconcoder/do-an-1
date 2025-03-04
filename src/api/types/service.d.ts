import { modelTypes } from './models/product';

export namespace serviceTypes {
    namespace product {
        interface CreateProductPayload
            extends Omit<
                modelTypes.product.ProductSchema,
                'product_rating_avg' | 'product_slug'
            > {}
    }
}
