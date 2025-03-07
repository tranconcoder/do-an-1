import { Router } from 'express';
/* --------------------- Controller --------------------- */
import ProductController from '../../controllers/product.controller';

/* --------------------- Middleware --------------------- */
import { authenticate } from '../../middlewares/jwt.middleware';
import catchError from '../../middlewares/catchError.middleware';
import validateRequestBody, {
} from '../../middlewares/joiValidate.middleware';

/* ------------------------- Joi ------------------------ */
import {
    createProductSchema,
    deleteProductSchema,
    updateProductSchema
} from '../../validations/joi/product/index.joi';
import productGetRoute from './get.route';
import productPatchRoute from './patch.route';

const productRoute = Router();
const productRouteValidate = Router();

/* -------------------------------------------------------------------------- */
/*                             Authenticate route                             */
/* -------------------------------------------------------------------------- */
productRoute.use(productRouteValidate);

productRouteValidate.use(authenticate);

/* ------------------- Product get route  ------------------- */
productRouteValidate.use(productGetRoute);

/* --------------- Product create post route  --------------- */
productRouteValidate.post(
    '/create',
    validateRequestBody(createProductSchema),
    catchError(ProductController.createProduct)
);

/* ================ Product patch route  ================ */
productRouteValidate.use(productPatchRoute);

productRouteValidate.put(
    '/update',
    validateRequestBody(updateProductSchema),
    catchError(ProductController.updateProduct)
);

/* ------------------ Product delete route ------------------ */
productRouteValidate.delete(
    '/delete',
    validateRequestBody(deleteProductSchema),
    catchError(ProductController.deleteProduct)
);

export default productRoute;
