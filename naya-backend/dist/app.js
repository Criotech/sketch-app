"use strict";
// /* eslint-disable func-names */
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const morgan_body_1 = __importDefault(require("morgan-body"));
const http_status_1 = __importDefault(require("http-status"));
const v1_1 = __importDefault(require("./routes/v1"));
const error_1 = require("./middlewares/error");
// eslint-disable-next-line import/no-unresolved
const apiError_1 = __importDefault(require("./utils/apiError"));
// Database
const database_1 = __importDefault(require("./config/database"));
dotenv.config();
const app = (0, express_1.default)();
(0, database_1.default)();
app.use((0, morgan_1.default)('dev'));
(0, morgan_body_1.default)(app);
// set security HTTP headers
app.use((0, helmet_1.default)());
// parse json request body
app.use(express_1.default.json());
// parse urlencoded request body
app.use(express_1.default.urlencoded({ extended: true }));
// gzip compression
app.use((0, compression_1.default)());
// enable cors
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
// v1 api routes
app.use('/v1/api', v1_1.default);
// send back a 404 error for any unknown api request
// eslint-disable-next-line no-redeclare
app.use((req, res, next) => {
    next(new apiError_1.default(http_status_1.default.NOT_FOUND, 'Not found'));
});
// convert error to ApiError, if needed
app.use(error_1.errorConverter);
// handle error
app.use(error_1.errorHandler);
exports.default = app;
