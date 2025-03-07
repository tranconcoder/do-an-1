import SuccessResponse, { CreatedResponse } from '../response/success.response';
import ProductFactory from '../services/product';
import { RequestWithBody, RequestWithParams } from '../types/request';

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
                        product_shop: req.userId as string
                    }
                )
            }).send(res);
        };

    /* ====================================================== */
    /*                       GET PRODUCT                      */
    /* ====================================================== */
    /* --------------- Get all product by shop -------------- */
    public static getAllProductByShop: RequestWithParams<joiTypes.product.definition.GetAllProductByShopSchema> =
        async (req, res, _) => {
            new SuccessResponse({
                name: 'Get product shop',
                message: 'Get product shop success',
                statusCode: 200,
                metadata: await ProductFactory.getAllProductByShop({
                    product_shop: req.userId as string,
                    currentPage: Number(req.params.currentPage)
                })
            }).send(res);
        };

    /* ====================================================== */
    /*                     UPDATE PRODUCT                     */
    /* ====================================================== */
    public static updateProduct: RequestWithBody<serviceTypes.product.arguments.UpdateProduct> =
        async (req, res, _) => {
            new SuccessResponse({
                name: 'Update product',
                statusCode: 200,
                message: 'Update product success',
                metadata:
                    (await ProductFactory.updateProduct({
                        ...req.body,
                        product_shop: req.userId as string
                    })) || {}
            }).send(res);
        };

    /* ====================================================== */
    /*                     DELETE PRODUCT                     */
    /* ====================================================== */
    public static deleteProduct: RequestWithBody<joiTypes.product.definition.DeleteProductSchema> =
        async (req, res, _) => {
            await ProductFactory.removeProduct(
                req.body.product_id,
                req.userId as string
            );

            new SuccessResponse({
                message: 'Product deleted successfully',
                name: 'Delete product',
                statusCode: 200
            }).send(res);
        };
}
