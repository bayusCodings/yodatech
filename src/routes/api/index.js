import { Router } from 'express';
import welcomeRoute from './welcome.route';
import movieRoute from './movie.route';
import commentRoute from './comment.route';

const routes = Router();

routes.use('/', welcomeRoute);
routes.use('/', movieRoute);
routes.use('/', commentRoute);

export default routes;