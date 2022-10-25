/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
import httpStatus from 'http-status';
import SketchModel from '../models/sketch.model';
import ApiError from '../utils/apiError';

const createSkectchFile = async (data: {
  fileName: string;
  userId: string;
}) => {
  return SketchModel.create(data);
};

const updateSketchFile = async (data: {
  fileId: string;
  sketchImage: string;
  userId: string;
}) => {
  const { fileId, sketchImage, userId } = data;
  const sketch = await SketchModel.findOneAndUpdate(
    {
      $or: [
        { _id: fileId, userId },
        { collaboators: userId, _id: fileId },
      ],
    },
    { $set: { sketchImage } }
  );
  if (!sketch) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sketch not found');
  } else {
    return sketch;
  }
};

const fetchSketches = async (userId: string) => {
  const sketches = await SketchModel.find({
    $or: [{ userId }, { collaboators: userId }],
  }).select('fileName');
  return sketches;
};

const fetchSketch = async (fileName: string) => {
  const sketch = await SketchModel.findById(fileName).populate(
    'collaboators',
    'firstName lastName email color'
  );
  if (!sketch) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sketch not found');
  } else {
    return sketch;
  }
};

const joinAsCollaborator = async (data: { fileId: string; userId: string }) => {
  const { fileId, userId } = data;
  const sketch = await SketchModel.findByIdAndUpdate(fileId, {
    $addToSet: { collaboators: userId },
  });
  if (!sketch) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sketch not found');
  } else {
    return sketch;
  }
};

export {
  createSkectchFile,
  updateSketchFile,
  fetchSketches,
  fetchSketch,
  joinAsCollaborator,
};
