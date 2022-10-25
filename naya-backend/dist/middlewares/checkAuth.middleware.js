"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const user_model_1 = __importDefault(require("../models/user.model"));
const catchAsync_1 = require("../utils/catchAsync");
const CheckAuth = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    if (!req.headers.authorization) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'Auth Failed');
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
    const user = await user_model_1.default.findById(decoded._id);
    if (user) {
        req.user = user;
        next();
    }
    else {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'Auth Failed');
    }
});
exports.default = CheckAuth;
