import mongoose from 'mongoose';
import SuccessResponse, { CreatedResponse } from '../response/success.response';
import ProductFactory from '../services/product';
import { joiTypes } from '../types/joi';
import { RequestWithBody } from '../types/request';

export default class ProductController {
    public static createProduct: RequestWithBody<joiTypes.product.CreateProductSchema> =
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

    public static deleteProduct: RequestWithBody<joiTypes.product.DeleteProductSchema> =
        async (req, res, _) => {
            await ProductFactory.removeProduct(
                req.body.product_category,
                req.body._id
            );

            new SuccessResponse({
                message: 'Product deleted successfully',
                name: 'Delete product',
                statusCode: 200
            }).send(res);
        };
}
