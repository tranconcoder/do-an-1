import express from 'express';

// Libs
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

// Services
import HandleErrorService from './api/services/handleError.service';

// Database
import MongoDB from './app/db.app';

// Configs
import { API_VERSION } from './configs/server.config';

// Routes
import rootRoute from './api/routes';
import { NotFoundErrorResponse } from './api/response/error.response';
import { redirectToApiVersion } from './api/middlewares/redirect.middleware';

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
const apiPath = `/${API_VERSION}/api`;
app.use('/', redirectToApiVersion(apiPath));
app.use(apiPath, rootRoute);

// Handle 404 route
app.use((_, __, next) => {
	next(new NotFoundErrorResponse('Route not exist!'));
});

// Error handler
app.use(HandleErrorService.middleware);

export default app;
