import { Router } from 'express';

// Controllers
import AuthController from '../../controllers/auth.controller';

// Joi
import signUpSchema from '../../validations/joi/signUp.joi';
import loginSchema from '../../validations/joi/login.joi';

// Middlewares
import catchError from '../../middlewares/catchError.middleware';
import joiValidate from '../../middlewares/joiValidate.middleware';
import { checkAuth } from '../../middlewares/jwt.middleware';

const authRoute = Router();

authRoute.post(
	'/sign-up',
	joiValidate(signUpSchema),
	catchError(AuthController.signUp)
);
authRoute.post(
	'/login',
	joiValidate(loginSchema),
	catchError(AuthController.login)
);
authRoute.post('/logout', checkAuth, catchError(AuthController.logout));

export default authRoute;
