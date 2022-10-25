"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinAsCollaborator = exports.fetchSketches = exports.fetchSketch = exports.updateSketchFile = exports.createSkectchFile = void 0;
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const http_status_1 = __importDefault(require("http-status"));
const uuidv4_1 = require("uuidv4");
const service_1 = require("../service");
const apiError_1 = __importDefault(require("../utils/apiError"));
const catchAsync_1 = require("../utils/catchAsync");
const createSkectchFile = (0, catchAsync_1.catchAsync)(async (req, res) => {
    if (!req.user) {
        throw new apiError_1.default(400, 'Not Authorized');
    }
    const { _id } = req.user;
    const sketch = await service_1.sketchService.createSkectchFile({
        fileName: (0, uuidv4_1.uuid)(),
        userId: _id,
    });
    res.status(http_status_1.default.CREATED).send({
        message: 'File created successfully.',
        data: sketch,
        status: true,
    });
});
exports.createSkectchFile = createSkectchFile;
const updateSketchFile = (0, catchAsync_1.catchAsync)(async (req, res) => {
    if (!req.user) {
        throw new apiError_1.default(400, 'Not Authorized');
    }
    const { _id } = req.user;
    const { fileId } = req.params;
    const { sketchImage } = req.body;
    const resp = await service_1.sketchService.updateSketchFile({
        fileId,
        sketchImage,
        userId: _id,
    });
    res.status(http_status_1.default.CREATED).send({ data: resp, status: true });
});
exports.updateSketchFile = updateSketchFile;
const fetchSketch = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { fileId } = req.params;
    const sketch = await service_1.sketchService.fetchSketch(fileId);
    res.status(http_status_1.default.CREATED).send({ data: sketch, status: true });
});
exports.fetchSketch = fetchSketch;
const fetchSketches = (0, catchAsync_1.catchAsync)(async (req, res) => {
    if (!req.user) {
        throw new apiError_1.default(400, 'Not Authorized');
    }
    const sketches = await service_1.sketchService.fetchSketches(req.user._id);
    res.status(http_status_1.default.CREATED).send({ data: sketches, status: true });
});
exports.fetchSketches = fetchSketches;
const joinAsCollaborator = (0, catchAsync_1.catchAsync)(async (req, res) => {
    if (!req.user) {
        throw new apiError_1.default(400, 'Not Authorized');
    }
    const { fileId } = req.params;
    const { _id } = req.user;
    const resp = await service_1.sketchService.joinAsCollaborator({
        fileId,
        userId: _id,
    });
    res.status(http_status_1.default.CREATED).send({ data: resp, status: true });
});
exports.joinAsCollaborator = joinAsCollaborator;
