import type { RequestHandler } from 'express';
import type { ProductJoiSchema } from '../validations/joi/product.joi';

import ProductFactory, { Factory } from '../services/product.service';
import { CreatedResponse } from '../response/success.response';
import mongoose from 'mongoose';

export default class ProductController {
    public static readonly createProduct: RequestHandler<
        any,
        any,
        ProductJoiSchema
    > = async (req, res, next) => {
        new CreatedResponse({
            message: 'Product created successfully',
            metadata: await ProductFactory.createProduct('product', {
                ...req.body,
                product_shop: new mongoose.Types.ObjectId(req.userId)
            })
        }).send(res);
    };
}
