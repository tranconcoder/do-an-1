import { Router } from 'express';
import { authenticate } from '../../middlewares/jwt.middleware';

const productRoute = Router();
const productRouteValidate = Router();

/* -------------------------------------------------------------------------- */
/*                             Authenticate route                             */
/* -------------------------------------------------------------------------- */
productRoute.use(productRouteValidate);

productRouteValidate.use(authenticate);

export default productRoute;
