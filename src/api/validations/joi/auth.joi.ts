import * as Joi from '@hapi/joi';
import 'joi-extract-type';

/* ====================================================== */
/*                      LOGIN SCHEMA                      */
/* ====================================================== */
export const loginSchema = Joi.object({
	phoneNumber: Joi.string()
		.required()
		.regex(/(\+84|84|0[3|5|7|8|9])+([0-9]{8})\b/),
	password: Joi.string()
		.required()
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
		),
});
export type LoginSchema = Joi.extractType<typeof loginSchema>;

/* ====================================================== */
/*                      SIGNUP SCHEMA                     */
/* ====================================================== */
export const signUpSchema = loginSchema.keys({
	email: Joi.string().email().required(),
	fullName: Joi.string().required().min(4).max(30),
});
export type SignUpSchema = Joi.extractType<typeof signUpSchema>;

/* ====================================================== */
/*                      NEW TOKEN SCHEMA                  */
/* ====================================================== */
export const handleRefreshTokenSchema = Joi.object({
	refreshToken: Joi.string().required(),
});
export type HandleRefreshTokenSchema = Joi.extractType<
	typeof handleRefreshTokenSchema
>;
