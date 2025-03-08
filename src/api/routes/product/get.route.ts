import { Router } from 'express';
import ProductController from '../../controllers/product.controller';
import catchError from '../../middlewares/catchError.middleware';
import { validateRequestParams } from '../../middlewares/joiValidate.middleware';
import { authenticate } from '../../middlewares/jwt.middleware';
import {
    getAllProductByShopSchema,
    getAllProductDraftByShopSchema,
    getAllProductPublishByShopSchema,
    getProductByIdSchema
} from '../../validations/joi/product/index.joi';

const productGetRoute = Router();
const productGetRouteValidate = Router();

/* ================= Get product by id  ================= */
productGetRoute.get(
    '/get-by-id/:product_id',
    validateRequestParams(getProductByIdSchema),
    catchError(ProductController.getProductById)
);

/* ====================================================== */
/*                    VALIDATE ROUTES                     */
/* ====================================================== */
productGetRoute.use(productGetRouteValidate);
productGetRouteValidate.use(authenticate);

/* ---------------- Get all product by shop  ---------------- */
productGetRouteValidate.get(
    '/product-shop/all/:currentPage',
    validateRequestParams(getAllProductByShopSchema),
    catchError(ProductController.getAllProductByShop)
);

/* ------------- Get all product draft by shop  ------------- */
productGetRouteValidate.get(
    '/product-shop/draft/all/:currentPage',
    validateRequestParams(getAllProductDraftByShopSchema),
    catchError(ProductController.getAllProductDraftByShop)
);

/* ------------ Get all product publish by shop  ------------ */
productGetRouteValidate.get(
    '/product-shop/publish/all/:currentPage',
    validateRequestParams(getAllProductPublishByShopSchema),
    catchError(ProductController.getAllProductPublishByShop)
);

/* ------------ Get all product undraft by shop  ------------ */
productGetRouteValidate.get(
    '/product-shop/undraft/all/:currentPage',
    validateRequestParams(getAllProductDraftByShopSchema),
    catchError(ProductController.getAllProductUndraftByShop)
);

/* ----------- Get all product unpublish by shop  ----------- */
productGetRouteValidate.get(
    '/product-shop/unpublish/all/:currentPage',
    validateRequestParams(getAllProductPublishByShopSchema),
    catchError(ProductController.getAllProductUnpublishByShop)
);

export default productGetRoute;
