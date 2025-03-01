import type { Request, Response, NextFunction } from 'express';

import { Schema } from '@hapi/joi';
import ErrorResponse from '../response/error.response';
import LoggerService from '../services/logger.service';

export default function joiValidate(joiSchema: Schema) {
    return async (req: Request, _: Response, next: NextFunction) => {
        try {
            await joiSchema.validate(req.body);

            next();
        } catch (err: any) {
            LoggerService.getInstance().debug(
                err?.message || 'Validate request body failed!'
            );

            next(new ErrorResponse(400, undefined, 'Invalid request body!'));
        }
    };
}
