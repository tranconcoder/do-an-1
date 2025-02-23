"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const winston = __importStar(require("winston"));
require("winston-daily-rotate-file");
const consoleTransport = new winston.transports.Console({
    format: winston.format.combine(winston.format.colorize(), winston.format.printf((info) => `[${info.level}]: ${info.message}`)),
});
const fileTransport = new winston.transports.DailyRotateFile({
    level: 'info',
    format: winston.format.combine(winston.format.metadata(), winston.format.timestamp(), winston.format.printf((info) => {
        var _a;
        const id = (_a = info === null || info === void 0 ? void 0 : info.metadata) === null || _a === void 0 ? void 0 : _a.id;
        const idText = id ? `(${id}) ` : '';
        return `${idText}[${info.timestamp}] [${info.level}]: ${info.message}`;
    })),
    zippedArchive: true,
    filename: '%DATE%.log',
    dirname: 'logs',
    datePattern: 'yyyy/[weeks]-ww/[day]-d',
    maxFiles: '30d',
    maxSize: '50m',
});
const loggerService = winston.createLogger({
    transports: [fileTransport],
});
if (process.env.NODE_ENV === 'development') {
    loggerService.add(consoleTransport);
}
exports.default = loggerService;
