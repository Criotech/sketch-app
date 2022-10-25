"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const apiError_1 = __importDefault(require("../utils/apiError"));
// FILE CHECK
function checkFileType(type) {
    return (_, file, cb) => {
        // Allowed ext
        let filetypes;
        if (type === 'pdf') {
            filetypes = /pdf/;
        }
        else if (type === 'image') {
            filetypes = /jpeg|jpg|png|gif/;
        }
        else {
            throw new apiError_1.default(429, 'Could not parse file type: ' + type);
        }
        // Check mime
        const mimetype = filetypes.test(file.mimetype);
        // Get ext
        const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        return cb(`Error Occured: Upload ${type.toUpperCase()} Only!`);
    };
}
// Multer execute
const Upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    fileFilter: checkFileType('image'),
});
exports.default = Upload;
