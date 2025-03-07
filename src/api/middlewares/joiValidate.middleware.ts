import { Schema } from 'joi';
import catchError from './catchError.middleware';

export default function validateRequestBody(schema: Schema) {
    return catchError(async (req, _, next) => {
        await schema.validateAsync(req.body);
        next();
    });
}

export const validateRequestParams = (schema: Schema) => {
    return catchError(async (req, _, next) => {
        await schema.validateAsync(req.params);
        next();
    });
};
