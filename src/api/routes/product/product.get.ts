import { Router } from 'express';
import ProductController from '../../controllers/product.controller';
import catchError from '../../middlewares/catchError.middleware';
import { validateRequestParams } from '../../middlewares/joiValidate.middleware';
import {
    getAllProductByShopSchema,
    getAllProductDraftByShopSchema,
    getAllProductPublishByShopSchema
} from '../../validations/joi/product/index.joi';

const productGetRoute = Router();

/* ---------------- Get all product by shop  ---------------- */
productGetRoute.get(
    '/product-shop/all/:currentPage',
    validateRequestParams(getAllProductByShopSchema),
    catchError(ProductController.getAllProductByShop)
);

/* ------------- Get all product draft by shop  ------------- */
productGetRoute.get(
    '/product-shop/draft/all/:currentPage',
    validateRequestParams(getAllProductDraftByShopSchema),
    catchError(ProductController.getAllProductDraftByShop)
);

/* ------------ Get all product publish by shop  ------------ */
productGetRoute.get(
    '/product-shop/publish/all/:currentPage',
    validateRequestParams(getAllProductPublishByShopSchema),
    catchError(ProductController.getAllProductPublishByShop)
);

/* ------------ Get all product undraft by shop  ------------ */
productGetRoute.get(
    '/product-shop/undraft/all/:currentPage',
    validateRequestParams(getAllProductDraftByShopSchema),
    catchError(ProductController.getAllProductUndraftByShop)
);

/* ----------- Get all product unpublish by shop  ----------- */
productGetRoute.get(
    '/product-shop/unpublish/all/:currentPage',
    validateRequestParams(getAllProductPublishByShopSchema),
    catchError(ProductController.getAllProductUnpublishByShop)
);

export default productGetRoute;
