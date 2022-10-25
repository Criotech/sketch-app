"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.errorConverter = void 0;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const mongoose_1 = __importDefault(require("mongoose"));
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../utils/apiError"));
// import logger from '../config/logger';
const logger_1 = __importDefault(require("../config/logger"));
const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof apiError_1.default)) {
        const statusCode = error.statusCode || error instanceof mongoose_1.default.Error
            ? http_status_1.default.BAD_REQUEST
            : http_status_1.default.INTERNAL_SERVER_ERROR;
        const message = error.message || http_status_1.default[statusCode];
        error = new apiError_1.default(statusCode, message, true, err.stack);
    }
    next(error);
};
exports.errorConverter = errorConverter;
const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    if (process.env.ENV === 'production' && !err.isOperational) {
        statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
        message = http_status_1.default[http_status_1.default.INTERNAL_SERVER_ERROR];
    }
    res.locals.errorMessage = err.message;
    const response = {
        code: statusCode,
        message,
        ...(process.env.ENV !== 'production' && { stack: err.stack }),
    };
    if (process.env.ENV !== 'production' && process.env.ENV !== 'test') {
        logger_1.default.error(err);
    }
    res.status(statusCode).send(response);
};
exports.errorHandler = errorHandler;
