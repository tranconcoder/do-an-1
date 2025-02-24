import * as Joi from '@hapi/joi';
import 'joi-extract-type';

const loginSchema = Joi.object({
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

export default loginSchema;
