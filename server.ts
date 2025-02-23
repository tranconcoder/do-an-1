import './src/helpers/loadEnv.helper';
import { HOST, PORT, BASE_URL } from './src/configs/server.config';
import app from './src/app';
import MongoDB from './src/app/db.app';
import loggerService from './src/services/logger.service';

const server = app.listen(PORT, HOST, () => {
	console.log(`Server is running on ${BASE_URL}`);
});

process.on('SIGINT', () => {
	// Close database connection
	MongoDB.getInstance().disconnect();

	// Close server
	server.close(() => {
		console.log('Server closed');
	});

	// Push notification to developer...
	loggerService.info('Server closed');
});
