import { Router } from 'express';
import { authenticate } from '../../middlewares/jwt.middleware';
import ProductController from '../../controllers/product.controller';
import catchError from '../../middlewares/catchError.middleware';
import joiValidate from '../../middlewares/joiValidate.middleware';
import {
    createProductSchema as createProductSchema,
    deleteProductSchema,
    updateProductSchema
} from '../../validations/joi/product/product.joi';

const productRoute = Router();
const productRouteValidate = Router();

/* -------------------------------------------------------------------------- */
/*                             Authenticate route                             */
/* -------------------------------------------------------------------------- */
productRoute.use(productRouteValidate);

productRouteValidate.use(authenticate);

productRouteValidate.post(
    '/create',
    joiValidate(createProductSchema),
    catchError(ProductController.createProduct)
);

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
