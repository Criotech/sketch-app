/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import httpStatus from 'http-status';
import { uuid } from 'uuidv4';
import { Request, Response } from 'express';
import { sketchService } from '../service';
import ApiError from '../utils/apiError';

import { catchAsync } from '../utils/catchAsync';

const createSkectchFile = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(400, 'Not Authorized');
  }
  const { _id } = req.user;

  const sketch = await sketchService.createSkectchFile({
    fileName: uuid(),
    userId: _id,
  });

  res.status(httpStatus.CREATED).send({
    message: 'File created successfully.',
    data: sketch,
    status: true,
  });
});

const updateSketchFile = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(400, 'Not Authorized');
  }
  const { _id } = req.user;
  const { fileId } = req.params;
  const { sketchImage } = req.body;
  const resp = await sketchService.updateSketchFile({
    fileId,
    sketchImage,
    userId: _id,
  });
  res.status(httpStatus.CREATED).send({ data: resp, status: true });
});

const fetchSketch = catchAsync(async (req: Request, res: Response) => {
  const { fileId } = req.params;
  const sketch = await sketchService.fetchSketch(fileId);
  res.status(httpStatus.CREATED).send({ data: sketch, status: true });
});

const fetchSketches = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(400, 'Not Authorized');
  }

  const sketches = await sketchService.fetchSketches(req.user._id);
  res.status(httpStatus.CREATED).send({ data: sketches, status: true });
});

const joinAsCollaborator = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(400, 'Not Authorized');
  }
  const { fileId } = req.params;
  const { _id } = req.user;
  const resp = await sketchService.joinAsCollaborator({
    fileId,
    userId: _id,
  });
  res.status(httpStatus.CREATED).send({ data: resp, status: true });
});

export {
  createSkectchFile,
  updateSketchFile,
  fetchSketch,
  fetchSketches,
  joinAsCollaborator,
};
