"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const sketch_route_1 = __importDefault(require("./sketch.route"));
const router = express_1.default.Router();
const defaultRoutes = [
    {
        path: '/users',
        route: user_route_1.default,
    },
    {
        path: '/sketches',
        route: sketch_route_1.default,
    },
];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
