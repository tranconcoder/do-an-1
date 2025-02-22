import { ErrorRequestHandler } from 'express';

export default class HandleErrorService {
	public static middleware: ErrorRequestHandler = (err, req, res, next) => {};
}
