import type { RequestHandler } from 'express';

import mongoose from 'mongoose';
import SuccessResponse, { CreatedResponse } from '../response/success.response';
import ProductFactory, { Product } from '../services/product';

export default class ProductController {
    public static readonly createProduct: RequestHandler<any, any, Product> =
        async (req, res, _) => {
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

    public static readonly deleteProduct: RequestHandler<any, any, any> =
        async (req, res, _) => {
            // new SuccessResponse({
            //     message: 'Product deleted successfully',
            //     metadata: await ProductFactory
            // });
        };
}
