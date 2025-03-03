import { PreSaveMiddlewareFunction } from 'mongoose';
import { ProductSchema } from '../product.model';

export const addSlug: PreSaveMiddlewareFunction<ProductSchema> = function () {
    this.product_slug = this.product_name.toLowerCase().replace(/ /g, '-');
};
