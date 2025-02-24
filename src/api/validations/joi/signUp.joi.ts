import * as Joi from '@hapi/joi';
import 'joi-extract-type';
import loginSchema from './login.joi';

const signUpSchema = loginSchema.keys({
	email: Joi.string().email().required(),
	fullName: Joi.string().required().min(4).max(30),
});

// Extract only working on Joi version 15 and below
export type SignUpSchema = Joi.extractType<typeof signUpSchema>;

export default signUpSchema;
