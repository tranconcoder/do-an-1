import { Router } from 'express';
import { authenticate } from '../../middlewares/jwt.middleware';

const discountGetRoute = Router();
const discountGetRouteValidated = Router();

/* ---------------------------------------------------------- */
/*                      Validated route                       */
/* ---------------------------------------------------------- */
discountGetRouteValidated.use(authenticate);
discountGetRoute.use(discountGetRouteValidated);

export default discountGetRoute;
