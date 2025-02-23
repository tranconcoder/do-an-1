import type { RequestHandler } from 'express';

export const redirectToApiVersion = (apiPath: string): RequestHandler => {
	return (req, res, next) => {
		if (!req.path.startsWith(apiPath)) {
			return res.redirect(`${apiPath}${req.path}`);
		}

		next();
	};
};
