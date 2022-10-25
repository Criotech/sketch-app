/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import httpStatus from 'http-status';
import { uuid } from 'uuidv4';
import { Request, Response } from 'express';
import { IUser } from '../interfaces/user.interface';
import {
  userService,
  authService,
  sketchService,
  fileUploadService,
} from '../service';

import { catchAsync } from '../utils/catchAsync';
import ApiError from '../utils/apiError';

export type CreateUserPayload = Pick<
  IUser,
  'email' | 'firstName' | 'lastName' | 'password'
>;

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);

  let sketchFile = await sketchService.createSkectchFile({
    userId: user._id,
    fileName: uuid(),
  });
  user.sketches = [sketchFile._id];
  await user.save();

  res.status(httpStatus.CREATED).send({
    message: `Account created successfully.`,
    status: true,
  });
});

const login = catchAsync(
  async (
    req: Request<{}, {}, { email: string; password: string }>,
    res: Response
  ) => {
    const resp = await authService.login(req.body);
    res.status(httpStatus.CREATED).send({ ...resp, status: true });
  }
);

const getAuthUser = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(400, 'Not Authorized');
  }

  const { firstName, lastName, email, sketches, _id, color, dp } = req.user;

  res.status(httpStatus.CREATED).send({
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

const updateProfilePic = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(400, 'Not Authorized');
  }

  const { _id, dp } = req.user;

  if (!req.file) {
    throw new ApiError(400, 'No file uploaded');
  }

  const { path } = req.file;

  if (dp && dp.url) {
    await fileUploadService.DeleteFile(dp.id);
  }

  const upload = await fileUploadService.UploadFile(path);

  if (upload) {
    const resp = await userService.updateUserProfile(_id, {
      dp: { id: upload.public_id, url: upload.url },
    });

    res.status(httpStatus.CREATED).send({
      message: 'Profile picture updated successfully',
      data: resp,
      status: true,
    });
  }
});

export { createUser, login, getAuthUser, updateProfilePic };
