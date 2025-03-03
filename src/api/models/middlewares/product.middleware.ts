import { PreSaveMiddlewareFunction } from 'mongoose';
import { modelTypes } from '../../types/models/product';
import slugify from 'slugify';

export const addSlug: PreSaveMiddlewareFunction<modelTypes.product.ProductSchema> =
    function () {
        this.product_slug = slugify(this.product_name, {
            lower: true,
            trim: true,
            locale: 'vi'
        });
    };
