import { Router } from 'express';
import ErrorResponse from '../response/error.response';
import { CreatedResponse } from '../response/success.response';

const rootRoute = Router();

rootRoute.get('/', (_, res) => {
	new CreatedResponse({
		name: '',
		message: 'Hello world!',
	}).send(res);
});

export default rootRoute;
