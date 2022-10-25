"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validations_1 = require("../../validations");
const validate_1 = __importDefault(require("../../middlewares/validate"));
const checkAuth_middleware_1 = __importDefault(require("../../middlewares/checkAuth.middleware"));
const fileUpload_middleware_1 = __importDefault(require("../../middlewares/fileUpload.middleware"));
const user_controller_1 = require("../../controllers/user.controller");
const router = express_1.default.Router();
router.route('/').post((0, validate_1.default)(validations_1.userValidation.createUser), user_controller_1.createUser);
router.route('/auth').get(checkAuth_middleware_1.default, user_controller_1.getAuthUser);
router.route('/login').post((0, validate_1.default)(validations_1.userValidation.login), user_controller_1.login);
router.route('/dp').patch(fileUpload_middleware_1.default.single('image'), checkAuth_middleware_1.default, user_controller_1.updateProfilePic);
exports.default = router;
