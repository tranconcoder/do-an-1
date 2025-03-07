import { Router } from 'express';
/* --------------------- Controller --------------------- */
import ProductController from '../../controllers/product.controller';

/* --------------------- Middleware --------------------- */
import { authenticate } from '../../middlewares/jwt.middleware';
import catchError from '../../middlewares/catchError.middleware';
import validateRequestBody from '../../middlewares/joiValidate.middleware';

/* ------------------------- Joi ------------------------ */
import {
    createProductSchema,
    deleteProductSchema,
    updateProductSchema
} from '../../validations/joi/product/index.joi';
import productGetRoute from './get.route';
import productPatchRoute from './patch.route';
import productPutRoute from './put.route';
import productDeleteRoute from './delete.route';
import productPostRoute from './post.route';

const productRoute = Router();
const productRouteValidate = Router();

/* -------------------------------------------------------------------------- */
/*                             Authenticate route                             */
/* -------------------------------------------------------------------------- */
productRoute.use(productRouteValidate);

productRouteValidate.use(authenticate);


/* ===================== GET route  ===================== */
productRouteValidate.use(productGetRoute);


/* ===================== POST route ===================== */
productRouteValidate.use(productPostRoute);


/* ==================== PATCH route  ==================== */
productRouteValidate.use(productPatchRoute);


/* ===================== PUT route  ===================== */
productRouteValidate.use(productPutRoute);


/* ==================== DELETE route ==================== */
productRouteValidate.use(productDeleteRoute);

export default productRoute;
