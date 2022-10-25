"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfilePic = exports.getAuthUser = exports.login = exports.createUser = void 0;
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const http_status_1 = __importDefault(require("http-status"));
const uuidv4_1 = require("uuidv4");
const service_1 = require("../service");
const catchAsync_1 = require("../utils/catchAsync");
const apiError_1 = __importDefault(require("../utils/apiError"));
const createUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const user = await service_1.userService.createUser(req.body);
    let sketchFile = await service_1.sketchService.createSkectchFile({
        userId: user._id,
        fileName: (0, uuidv4_1.uuid)(),
    });
    user.sketches = [sketchFile._id];
    await user.save();
    res.status(http_status_1.default.CREATED).send({
        message: `Account created successfully.`,
        status: true,
    });
});
exports.createUser = createUser;
const login = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const resp = await service_1.authService.login(req.body);
    res.status(http_status_1.default.CREATED).send({ ...resp, status: true });
});
exports.login = login;
const getAuthUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    if (!req.user) {
        throw new apiError_1.default(400, 'Not Authorized');
    }
    const { firstName, lastName, email, sketches, _id, color, dp } = req.user;
    res.status(http_status_1.default.CREATED).send({
        message: 'fetched successfully',
        data: {
            firstName,
            lastName,
            email,
            _id,
            sketches,
            color,
            dp,
        },
        status: true,
    });
});
exports.getAuthUser = getAuthUser;
const updateProfilePic = (0, catchAsync_1.catchAsync)(async (req, res) => {
    if (!req.user) {
        throw new apiError_1.default(400, 'Not Authorized');
    }
    const { _id, dp } = req.user;
    if (!req.file) {
        throw new apiError_1.default(400, 'No file uploaded');
    }
    const { path } = req.file;
    if (dp && dp.url) {
        await service_1.fileUploadService.DeleteFile(dp.id);
    }
    const upload = await service_1.fileUploadService.UploadFile(path);
    if (upload) {
        const resp = await service_1.userService.updateUserProfile(_id, {
            dp: { id: upload.public_id, url: upload.url },
        });
        res.status(http_status_1.default.CREATED).send({
            message: 'Profile picture updated successfully',
            data: resp,
            status: true,
        });
    }
});
exports.updateProfilePic = updateProfilePic;
