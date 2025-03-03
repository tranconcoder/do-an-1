import mongoose from 'mongoose';
import { AutoType } from '../types/common';
import { required } from '../../configs/mongoose.config';
import { USER_MODEL_NAME } from '../models/user.model';
import path from 'path';
import { ProductListKey } from '../types/models/product';

export const addProductShopToSchema = <T = any>(schema: T) => {
    const productShop = {
        product_shop: {
            type: mongoose.Types.ObjectId,
            ref: USER_MODEL_NAME,
            required
        }
    };

    return {
        ...schema,
        ...productShop
    } as AutoType<T> & typeof productShop;
};

export const importProductService = async (
    productName: Lowercase<ProductListKey>
) => {
    const PRODUCT_SERVICE_PATH = path.join(__dirname, '../services/product');

    return await import(`${PRODUCT_SERVICE_PATH}/${productName}.service`).then(
        (x) => x.default
    );
};

export const importProductModel = async (productName: ProductListKey) => {
    const PRODUCT_MODEL_PATH = path.join(
        __dirname,
        '../models/product.model.js'
    );

    return await import(PRODUCT_MODEL_PATH).then(
        (x) => x[`${productName.toLowerCase()}Schema`]
    );
};
