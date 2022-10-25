"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validations_1 = require("../../validations");
const validate_1 = __importDefault(require("../../middlewares/validate"));
const checkAuth_middleware_1 = __importDefault(require("../../middlewares/checkAuth.middleware"));
const sketch_controller_1 = require("../../controllers/sketch.controller");
const router = express_1.default.Router();
router
    .route('/')
    .post(checkAuth_middleware_1.default, sketch_controller_1.createSkectchFile)
    .get(checkAuth_middleware_1.default, sketch_controller_1.fetchSketches);
router
    .route('/:fileId')
    .patch((0, validate_1.default)(validations_1.sketchValidation.updateSketchFile), checkAuth_middleware_1.default, sketch_controller_1.updateSketchFile);
router
    .route('/:fileId')
    .get((0, validate_1.default)(validations_1.sketchValidation.fetchSketch), checkAuth_middleware_1.default, sketch_controller_1.fetchSketch);
router.route('/:fileId/join').post(checkAuth_middleware_1.default, sketch_controller_1.joinAsCollaborator);
exports.default = router;
