import express from 'express';
import { sketchValidation } from '../../validations';
import validate from '../../middlewares/validate';
import CheckAuth from '../../middlewares/checkAuth.middleware';
import {
  createSkectchFile,
  updateSketchFile,
  fetchSketch,
  fetchSketches,
  joinAsCollaborator,
} from '../../controllers/sketch.controller';

const router = express.Router();

router
  .route('/')
  .post(CheckAuth, createSkectchFile)
  .get(CheckAuth, fetchSketches);

router
  .route('/:fileId')
  .patch(
    validate(sketchValidation.updateSketchFile),
    CheckAuth,
    updateSketchFile
  );

router
  .route('/:fileId')
  .get(validate(sketchValidation.fetchSketch), CheckAuth, fetchSketch);

router.route('/:fileId/join').post(CheckAuth, joinAsCollaborator);

export default router;
