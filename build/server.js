"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./src/helpers/loadEnv.helper");
const server_config_1 = require("./src/configs/server.config");
const app_1 = __importDefault(require("./src/app"));
const db_app_1 = __importDefault(require("./src/app/db.app"));
const logger_service_1 = __importDefault(require("./src/api/services/logger.service"));
const server = app_1.default.listen(server_config_1.PORT, server_config_1.HOST, () => {
    console.log(`Server is running on ${server_config_1.BASE_URL}`);
});
process.on('SIGINT', () => {
    // Close database connection
    db_app_1.default.getInstance().disconnect();
    // Close server
    server.close(() => {
        console.log('Server closed');
    });
    // Push notification to developer...
    logger_service_1.default.info('Server closed');
});
