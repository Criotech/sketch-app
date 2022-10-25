"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
/* eslint-disable no-underscore-dangle */
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = __importDefault(require("../models/user.model"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const login = async (data) => {
    const { password, email } = data;
    const user = await user_model_1.default.findOne({ email });
    if (!user || !(await user.checkPassword(password))) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid email or password');
    }
    return user.toAuthJSON();
};
exports.login = login;
