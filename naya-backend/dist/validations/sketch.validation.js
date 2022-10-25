"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSketch = exports.updateSketchFile = void 0;
const Joi = require('joi');
const updateSketchFile = {
    params: Joi.object().keys({
        fileId: Joi.string().required(),
    }),
    body: Joi.object().keys({
        sketchImage: Joi.string().required(),
    }),
};
exports.updateSketchFile = updateSketchFile;
const fetchSketch = {
    params: Joi.object().keys({
        fileId: Joi.string().required(),
    }),
};
exports.fetchSketch = fetchSketch;
