import { Router } from 'express';

// Route child
import authRoute from './auth';
import productRoute from './product';

const rootRoute = Router();

rootRoute.use('/auth', authRoute);
rootRoute.use('/product', productRoute);

export default rootRoute;
