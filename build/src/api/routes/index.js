"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_response_1 = __importDefault(require("../response/error.response"));
const rootRoute = (0, express_1.Router)();
rootRoute.get('/', (_, res) => {
    console.log(new error_response_1.default(404, 'Not Found').get());
    res.json({
        message: 'Hello World!',
    });
});
exports.default = rootRoute;
