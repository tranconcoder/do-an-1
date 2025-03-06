import { RequestHandler } from 'express';
import { getAllProductByShopSchema } from '../validations/joi/product/index.joi';
import catchError from './catchError.middleware';
import { ForbiddenErrorResponse } from '../response/error.response';

export const getAllProductByShopCheckParams: RequestHandler = catchError(
    async (req, _, next) => {
        try {
            await getAllProductByShopSchema.validateAsync(req.params);

            next();
        } catch (error) {
            throw new ForbiddenErrorResponse(
                'Validate itemPerPage, currentPage failed!'
            );
        }
    }
);
