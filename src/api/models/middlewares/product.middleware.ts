import { PreSaveMiddlewareFunction } from 'mongoose';
import { modelTypes } from '../../types/models/porduct';

export const addSlug: PreSaveMiddlewareFunction<modelTypes.Product.ProductSchema> =
    function () {
        this.product_slug = this.product_name.toLowerCase().replace(/ /g, '-');
    };
