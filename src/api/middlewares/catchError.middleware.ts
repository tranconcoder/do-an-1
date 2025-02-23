import { NextFunction, RequestHandler, Request, Response } from 'express';

export default function catchError(cb: RequestHandler): RequestHandler {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await cb(req, res, next);
		} catch (err) {
			next(err);
		}
	};
}
