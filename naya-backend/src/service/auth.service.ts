/* eslint-disable no-underscore-dangle */
import httpStatus from 'http-status';
import UserModel from '../models/user.model';
import ApiError from '../utils/apiError';

const login = async (data: { email: string; password: string }) => {
  const { password, email } = data;
  const user = await UserModel.findOne({ email });

  if (!user || !(await user.checkPassword(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  return user.toAuthJSON();
};

export { login };
