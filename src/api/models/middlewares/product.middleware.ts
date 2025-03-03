import { PreSaveMiddlewareFunction } from 'mongoose';
import { modelTypes } from '../../types/models/product';

export const addSlug: PreSaveMiddlewareFunction<modelTypes.product.ProductSchema> =
    function () {
        this.product_slug = this.product_name.toLowerCase().replace(/ /g, '-');
    };
