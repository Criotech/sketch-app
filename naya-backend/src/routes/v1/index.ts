import express from 'express';
import userRoute from './user.route';
import sketchRoute from './sketch.route';

const router = express.Router();

interface RouteStructure {
  path: string;
  route: any;
}

const defaultRoutes: RouteStructure[] = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/sketches',
    route: sketchRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
