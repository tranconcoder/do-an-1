import { Router } from 'express';

// Route child
import authRoute from './auth';

const rootRoute = Router();

rootRoute.use('/auth', authRoute);

export default rootRoute;
