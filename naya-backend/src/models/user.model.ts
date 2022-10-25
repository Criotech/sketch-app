/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import mongoose, { Schema, Document, Model } from 'mongoose';
import jwt from 'jsonwebtoken';

import validator from 'validator';
import bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/user.interface';

interface AuthJson extends IUser {
  token: boolean;
}

export interface IUserDocument extends IUser, Document {
  checkPassword: (password: string) => Promise<boolean>;
  generateJWT: () => string;
  toAuthJSON: () => AuthJson;
}

interface IUserModel extends Model<IUserDocument> {
  findByEmail: (email: string) => Promise<IUserDocument>;
}

const UserSchema: Schema<IUserDocument> = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            'Password must contain at least one letter and one number'
          );
        }
      },
    },
    sketches: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    color: {
      type: String,
    },
    dp: {
      url: { type: String },
      id: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.checkPassword = async function (password: string) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

UserSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET_KEY!,
    {
      expiresIn: process.env.JWT_EXPIRE!,
    }
  );
};

UserSchema.methods.toAuthJSON = function () {
  const { firstName, lastName, email, sketches } = this;
  return {
    firstName,
    lastName,
    email,
    sketches,
    token: this.generateJWT(),
  };
};

UserSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email });
};

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const UserModel = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);
export default UserModel;
