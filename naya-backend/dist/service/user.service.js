"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.fetchUser = exports.createUser = void 0;
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
const http_status_1 = __importDefault(require("http-status"));
const randomcolor_1 = __importDefault(require("randomcolor"));
const user_model_1 = __importDefault(require("../models/user.model"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const createUser = async (userBody) => {
    if (await user_model_1.default.findByEmail(userBody.email)) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Email already taken');
    }
    return user_model_1.default.create({ ...userBody, color: (0, randomcolor_1.default)() });
};
exports.createUser = createUser;
const fetchUser = async (userId) => {
    const user = await user_model_1.default.findById(userId).select('_id email firstName lastName');
    if (!user) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    else {
        return user;
    }
};
exports.fetchUser = fetchUser;
const updateUserProfile = async (userId, userBody) => {
    const updateProfile = await user_model_1.default.findOneAndUpdate({ _id: userId }, { $set: userBody }, { new: true });
    if (!updateProfile) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Operation failed');
    }
    else {
        return updateProfile;
    }
};
exports.updateUserProfile = updateUserProfile;
