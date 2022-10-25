"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
const db = async () => {
    const dbUri = process.env.MONGO_URI;
    try {
        await mongoose_1.default.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger_1.default.info('Connected to MongoDB');
    }
    catch (error) {
        logger_1.default.info('connection error', error);
        process.exit(1);
    }
};
exports.default = db;
