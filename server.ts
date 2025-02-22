import './src/helpers/loadEnv.helper';

// Configs
import { HOST, PORT, BASE_URL } from './src/configs/server.config';

// Express
import app from './src/app';
import MongoDB from './src/app/db.app';

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
	// Send email to developer...
});
