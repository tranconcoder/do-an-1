import { Router } from 'express';
import AuthController from '../../controllers/auth.controller';
import catchError from '../../middlewares/catchError.middleware';
import joiValidate from '../../middlewares/joiValidate.middleware';
import signUpSchema from '../../validations/joi/signUp.joi';
import loginSchema from '../../validations/joi/login.joi';

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

export default authRoute;
