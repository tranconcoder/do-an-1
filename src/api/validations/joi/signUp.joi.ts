import * as Joi from '@hapi/joi';
import 'joi-extract-type';

const signUpSchema = Joi.object({
	phoneNumber: Joi.string()
		.required()
		.regex(/(\+84|84|0[3|5|7|8|9])+([0-9]{8})\b/),
	email: Joi.string().email().required(),
	password: Joi.string()
		.required()
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
		),
	fullName: Joi.string().required().min(4).max(30),
});

// Extract only working on Joi version 15 and below
export type SignUpSchema = Joi.extractType<typeof signUpSchema>;

export default signUpSchema;
