import express from 'express';
import { userValidation } from '../../validations';
import validate from '../../middlewares/validate';
import CheckAuth from '../../middlewares/checkAuth.middleware';
import Upload from '../../middlewares/fileUpload.middleware';
import {
  createUser,
  login,
  getAuthUser,
  updateProfilePic,
} from '../../controllers/user.controller';

const router = express.Router();

router.route('/').post(validate(userValidation.createUser), createUser);

router.route('/auth').get(CheckAuth, getAuthUser);

router.route('/login').post(validate(userValidation.login), login);

router.route('/dp').patch(Upload.single('image'), CheckAuth, updateProfilePic);

export default router;
