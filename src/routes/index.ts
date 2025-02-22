import { Router } from 'express';

const rootRoute = Router();

rootRoute.get('/', (_, res) => {
	console.log(123);
	res.json({
		message: 'Hello World!',
	});
});

export default rootRoute;
