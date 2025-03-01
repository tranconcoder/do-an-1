import type { RequestHandler } from 'express';

import ProductFactory, { Factory } from '../services/product.service';
import { CreatedResponse } from '../response/success.response';
import mongoose from 'mongoose';

export default class ProductController {
    public static readonly createProduct: RequestHandler<any, any, Factory> =
        async (req, res, next) => {
            new CreatedResponse({
                message: 'Product created successfully',
                metadata: await ProductFactory.createProduct(
                    req.body.product_category,
                    {
                        ...req.body,
                        product_shop: new mongoose.Types.ObjectId(req.userId)
                    }
                )
            }).send(res);
        };
}
