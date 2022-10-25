/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import mongoose, { Schema, Document, Model } from 'mongoose';
import { ISketch } from '../interfaces/sketch.interface';

export interface ISketchDocument extends ISketch, Document {}

interface ISketchModel extends Model<ISketchDocument> {}

const SketchSchema: Schema<ISketchDocument> = new Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sketchImage: {
      type: String,
      default: '',
    },
    collaboators: {
      type: [mongoose.Types.ObjectId],
      ref: 'User',
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const SketchModel = mongoose.model<ISketchDocument, ISketchModel>(
  'Sketch',
  SketchSchema
);
export default SketchModel;
