/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
import httpStatus from 'http-status';
import randomcolor from 'randomcolor';
import { CreateUserPayload } from '../controllers/user.controller';
import UserModel from '../models/user.model';
import ApiError from '../utils/apiError';

const createUser = async (userBody: CreateUserPayload) => {
  if (await UserModel.findByEmail(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  return UserModel.create({ ...userBody, color: randomcolor() });
};

const fetchUser = async (userId: string) => {
  const user = await UserModel.findById(userId).select(
    '_id email firstName lastName'
  );
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  } else {
    return user;
  }
};

const updateUserProfile = async (userId: string, userBody: any) => {
  const updateProfile = await UserModel.findOneAndUpdate(
    { _id: userId },
    { $set: userBody },
    { new: true }
  );

  if (!updateProfile) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Operation failed');
  } else {
    return updateProfile;
  }
};

export { createUser, fetchUser, updateUserProfile };
