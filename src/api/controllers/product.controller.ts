import mongoose from 'mongoose';
import SuccessResponse, { CreatedResponse } from '../response/success.response';
import ProductFactory from '../services/product';
import { RequestWithBody } from '../types/request';

export default class ProductController {
    /* ====================================================== */
    /*                     CREATE PRODUCT                     */
    /* ====================================================== */
    public static createProduct: RequestWithBody<joiTypes.product.definition.CreateProductSchema> =
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

    /* ====================================================== */
    /*                     UPDATE PRODUCT                     */
    /* ====================================================== */
    public static updateProduct: RequestWithBody<joiTypes.product.definition.UpdateProductSchema> =
        async (req, res, _) => {
            new SuccessResponse({
                name: 'Update product',
                statusCode: 200,
                message: 'Update product success',
                metadata: await ProductFactory.updateProduct(req.body)
            }).send(res);
        };

    /* ====================================================== */
    /*                     DELETE PRODUCT                     */
    /* ====================================================== */
    public static deleteProduct: RequestWithBody<joiTypes.product.definition.DeleteProductSchema> =
        async (req, res, _) => {
            await ProductFactory.removeProduct(
                req.body.product_category,
                req.body.product_id
            );

            new SuccessResponse({
                message: 'Product deleted successfully',
                name: 'Delete product',
                statusCode: 200
            }).send(res);
        };
}
