import { Router } from 'express';
/* --------------------- Controller --------------------- */

/* --------------------- Middleware --------------------- */
import { authenticate } from '../../middlewares/jwt.middleware';

/* ------------------------- Joi ------------------------ */

/* ======================= Routes ======================= */
import productGetRoute from './get.route';
import productPatchRoute from './patch.route';
import productPutRoute from './put.route';
import productDeleteRoute from './delete.route';
import productPostRoute from './post.route';

const productRoute = Router();
const productRouteValidate = Router();

/* ===================== GET route  ===================== */
productRoute.use(productGetRoute);



/* ====================================================== */
/*                  AUTHENTICATE ROUTES                   */
/* ====================================================== */
productRoute.use(productRouteValidate);
productRouteValidate.use(authenticate);

/* ===================== POST route ===================== */
productRouteValidate.use(productPostRoute);

/* ==================== PATCH route  ==================== */
productRouteValidate.use(productPatchRoute);

/* ===================== PUT route  ===================== */
productRouteValidate.use(productPutRoute);

/* ==================== DELETE route ==================== */
productRouteValidate.use(productDeleteRoute);

export default productRoute;
