import { Router } from 'express';
import discountGetRoute from './get.route';
import discountPostRoute from './post.route';

const discountRoute = Router();

/* -------------------------- GET  -------------------------- */
discountRoute.use(discountGetRoute);

/* -------------------------- POST -------------------------- */
discountRoute.use(discountPostRoute);

export default discountRoute;
