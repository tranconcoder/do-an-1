import { Router } from 'express';
import ErrorResponse, {
	NotFoundErrorResponse,
} from '../response/error.response';
import { CreatedResponse } from '../response/success.response';

const rootRoute = Router();

rootRoute.get('/', (_, res, next) => {
	next(new NotFoundErrorResponse());
});

export default rootRoute;
