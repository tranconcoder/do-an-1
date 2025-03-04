import type { Request, Response, NextFunction } from 'express';

import ErrorResponse from '../response/error.response';
import { Schema } from 'joi';

export default function joiValidate(joiSchema: Schema) {
    return async (req: Request, _: Response, next: NextFunction) => {
        try {
            await joiSchema.validateAsync(req.body);

            next();
        } catch (err: any) {
            const message = err?.message || 'Validate request body failed!';

            next(new ErrorResponse(400, undefined, message));
        }
    };
}
