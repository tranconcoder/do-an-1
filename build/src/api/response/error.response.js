"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictErrorResponse = exports.ForbiddenErrorResponse = exports.NotFoundErrorResponse = exports.UnauthorizedErrorResponse = exports.BadRequestErrorResponse = exports.InternalServerErrorResponse = void 0;
const http_status_codes_1 = require("http-status-codes");
// Libs
const lodash_1 = __importDefault(require("lodash"));
class ErrorResponse {
    constructor(statusCode, name = 'ErrorResponse', message = http_status_codes_1.StatusCodes[statusCode]) {
        this.statusCode = statusCode;
        this.name = name;
        this.message = message;
        this.statusCode = statusCode;
        this.name = name;
        this.message = message;
    }
    get() {
        return lodash_1.default.pick(this, ['statusCode', 'name', 'message']);
    }
}
exports.default = ErrorResponse;
class InternalServerErrorResponse extends ErrorResponse {
    constructor(message = http_status_codes_1.StatusCodes[http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR]) {
        super(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'InternalServerError', message);
    }
}
exports.InternalServerErrorResponse = InternalServerErrorResponse;
class BadRequestErrorResponse extends ErrorResponse {
    constructor(message = http_status_codes_1.StatusCodes[http_status_codes_1.StatusCodes.BAD_REQUEST]) {
        super(http_status_codes_1.StatusCodes.BAD_REQUEST, 'BadRequest', message);
    }
}
exports.BadRequestErrorResponse = BadRequestErrorResponse;
class UnauthorizedErrorResponse extends ErrorResponse {
    constructor(message = http_status_codes_1.StatusCodes[http_status_codes_1.StatusCodes.UNAUTHORIZED]) {
        super(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Unauthorized', message);
    }
}
exports.UnauthorizedErrorResponse = UnauthorizedErrorResponse;
class NotFoundErrorResponse extends ErrorResponse {
    constructor(message = http_status_codes_1.StatusCodes[http_status_codes_1.StatusCodes.NOT_FOUND]) {
        super(http_status_codes_1.StatusCodes.NOT_FOUND, 'NotFound', message);
    }
}
exports.NotFoundErrorResponse = NotFoundErrorResponse;
class ForbiddenErrorResponse extends ErrorResponse {
    constructor(message = http_status_codes_1.StatusCodes[http_status_codes_1.StatusCodes.FORBIDDEN]) {
        super(http_status_codes_1.StatusCodes.FORBIDDEN, 'Forbidden', message);
    }
}
exports.ForbiddenErrorResponse = ForbiddenErrorResponse;
class ConflictErrorResponse extends ErrorResponse {
    constructor(message = http_status_codes_1.StatusCodes[http_status_codes_1.StatusCodes.CONFLICT]) {
        super(http_status_codes_1.StatusCodes.CONFLICT, 'Conflict', message);
    }
}
exports.ConflictErrorResponse = ConflictErrorResponse;
