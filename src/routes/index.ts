import { Router } from 'express';
import ErrorResponse from '../response/error.response';

const rootRoute = Router();

rootRoute.get('/', (_, res) => {
	console.log(new ErrorResponse(404, 'Not Found').get());

	res.json({
		message: 'Hello World!',
	});
});

export default rootRoute;
