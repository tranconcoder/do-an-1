import { Router } from 'express';
/* --------------------- Controller --------------------- */
import ProductController from '../../controllers/product.controller';

/* --------------------- Middleware --------------------- */
import { authenticate } from '../../middlewares/jwt.middleware';
import catchError from '../../middlewares/catchError.middleware';
import joiValidate, {
    validateRequestParams
} from '../../middlewares/joiValidate.middleware';

/* ------------------------- Joi ------------------------ */
import {
    createProductSchema,
    deleteProductSchema,
    updateProductSchema
} from '../../validations/joi/product/index.joi';
import productGetRoute from './product.get';

const productRoute = Router();
const productRouteValidate = Router();

/* -------------------------------------------------------------------------- */
/*                             Authenticate route                             */
/* -------------------------------------------------------------------------- */
productRoute.use(productRouteValidate);

productRouteValidate.use(authenticate)

/* ------------------- Product get route  ------------------- */
productRouteValidate.use(productGetRoute);

/* --------------- Product create post route  --------------- */
productRouteValidate.post(
    '/create',
    joiValidate(createProductSchema),
    catchError(ProductController.createProduct)
);

/* ------------------ Product delete route ------------------ */
productRouteValidate.delete(
    '/delete',
    joiValidate(deleteProductSchema),
    catchError(ProductController.deleteProduct)
);

productRouteValidate.put(
    '/update',
    joiValidate(updateProductSchema),
    catchError(ProductController.updateProduct)
);

export default productRoute;
