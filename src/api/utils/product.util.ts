import mongoose from 'mongoose';
import { AutoType } from '../types/common';
import { required } from '../../configs/mongoose.config';
import { USER_MODEL_NAME } from '../models/user.model';
import path from 'path';

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

export const importProductService = async (productName: string) => {
    const PRODUCT_SERVICE_PATH = path.join(__dirname, '../services/product');

    const { default: service } = await import(
        `${PRODUCT_SERVICE_PATH}/${productName}.service`
    );

    return service;
};
