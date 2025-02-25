import { Schema } from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import ErrorResponse from '../response/error.response';

export default function joiValidate(joiSchema: Schema) {
	return async (req: Request, _: Response, next: NextFunction) => {
		try {
			await joiSchema.validate(req.body);

			next();
		} catch (err) {
			next(new ErrorResponse(400, undefined, 'Invalid request body!'));
		}
	};
}
