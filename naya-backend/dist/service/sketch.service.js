"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinAsCollaborator = exports.fetchSketch = exports.fetchSketches = exports.updateSketchFile = exports.createSkectchFile = void 0;
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
const http_status_1 = __importDefault(require("http-status"));
const sketch_model_1 = __importDefault(require("../models/sketch.model"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const createSkectchFile = async (data) => {
    return sketch_model_1.default.create(data);
};
exports.createSkectchFile = createSkectchFile;
const updateSketchFile = async (data) => {
    const { fileId, sketchImage, userId } = data;
    const sketch = await sketch_model_1.default.findOneAndUpdate({
        $or: [
            { _id: fileId, userId },
            { collaboators: userId, _id: fileId },
        ],
    }, { $set: { sketchImage } });
    if (!sketch) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Sketch not found');
    }
    else {
        return sketch;
    }
};
exports.updateSketchFile = updateSketchFile;
const fetchSketches = async (userId) => {
    const sketches = await sketch_model_1.default.find({
        $or: [{ userId }, { collaboators: userId }],
    }).select('fileName');
    return sketches;
};
exports.fetchSketches = fetchSketches;
const fetchSketch = async (fileName) => {
    const sketch = await sketch_model_1.default.findById(fileName).populate('collaboators', 'firstName lastName email color');
    if (!sketch) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Sketch not found');
    }
    else {
        return sketch;
    }
};
exports.fetchSketch = fetchSketch;
const joinAsCollaborator = async (data) => {
    const { fileId, userId } = data;
    const sketch = await sketch_model_1.default.findByIdAndUpdate(fileId, {
        $addToSet: { collaboators: userId },
    });
    if (!sketch) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Sketch not found');
    }
    else {
        return sketch;
    }
};
exports.joinAsCollaborator = joinAsCollaborator;
