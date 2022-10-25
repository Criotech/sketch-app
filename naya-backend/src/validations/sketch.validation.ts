const Joi = require('joi');

const updateSketchFile = {
  params: Joi.object().keys({
    fileId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    sketchImage: Joi.string().required(),
  }),
};

const fetchSketch = {
  params: Joi.object().keys({
    fileId: Joi.string().required(),
  }),
};

export { updateSketchFile, fetchSketch };
