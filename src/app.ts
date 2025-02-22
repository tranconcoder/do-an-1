import express from 'express';

// Libs
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

// Services
import HandleErrorService from './services/handleError.service';

// Database
import MongoDB from './app/db.app';

// Configs
import { API_VERSION } from './configs/server.config';

// Routes
import rootRoute from './routes';
import { NotFoundErrorResponse } from './response/error.response';

const app = express();

//
// Express middleware
//
// Body parser
app.use(express.json());
app.use(express.raw());
app.use(express.text());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Static files
app.use('/public', express.static(path.join(__dirname, '../public')));

//
// Middleware
//
// Morgan
app.use(morgan('dev'));
// Helmet for security
app.use(helmet());
// Compression
app.use(compression());

//
// Database
//
MongoDB.getInstance().connect();

//
// Routes
//
// Append newest API version if not found
const apiRoute = `/${API_VERSION}/api`;
app.use('/', (req, res, next) => {
	if (!req.path.startsWith(apiRoute)) {
		res.redirect(`${apiRoute}${req.path}`);
	} else {
		next();
	}
});
app.use(apiRoute, rootRoute);

// Handle 404 route
app.use((_, __, next) => {
	next(new NotFoundErrorResponse('Route not exist!'));
});

// Error handler
app.use(HandleErrorService.middleware);

export default app;
