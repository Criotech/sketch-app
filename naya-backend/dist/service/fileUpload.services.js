"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFile = exports.UploadFile = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const logger_1 = __importDefault(require("../config/logger"));
// eslint-disable-next-line camelcase
// eslint-disable-next-line consistent-return
const UploadFile = async (file) => {
    try {
        // eslint-disable-next-line camelcase
        const as = await cloudinary_1.default.v2.uploader.upload(file, {
            resource_type: 'auto',
            folder: 'naya_backend',
        });
        return { public_id: as.public_id, url: as.url };
    }
    catch (error) {
        logger_1.default.info('error occured', error);
    }
};
exports.UploadFile = UploadFile;
const DeleteFile = async (pictureId) => {
    try {
        await cloudinary_1.default.v2.uploader.destroy(pictureId);
        return;
    }
    catch (error) {
        logger_1.default.info('error occured', error);
    }
};
exports.DeleteFile = DeleteFile;
