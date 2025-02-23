"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const error_response_1 = __importDefault(require("../response/error.response"));
const logger_service_1 = __importDefault(require("./logger.service"));
const uuid_1 = require("uuid");
const server_config_1 = require("../../configs/server.config");
class HandleErrorService {
}
_a = HandleErrorService;
HandleErrorService.middleware = (err, req, res, next) => {
    let errorResponse = err;
    // Convert error to ErrorResponse if it's not already
    if (!(err instanceof error_response_1.default)) {
        errorResponse = new error_response_1.default(500, err === null || err === void 0 ? void 0 : err.name, err === null || err === void 0 ? void 0 : err.message);
    }
    // Handle return response
    _a[server_config_1.NODE_ENV](errorResponse, req, res, next);
};
HandleErrorService.development = (error, _, res, next) => {
    // Log error
    logger_service_1.default.error(error.get());
    // Send error response
    res.status(error.statusCode).json(error.get());
};
HandleErrorService.production = (error, _, res, next) => {
    // Generate error
    const logId = (0, uuid_1.v7)();
    // Log error
    logger_service_1.default.error(error.get(), { id: logId });
    // Send error response
    res.status(error.statusCode).json({
        code: logId,
        statusCode: error.statusCode,
        message: 'Something went wrong. Please try again later.',
    });
};
exports.default = HandleErrorService;
