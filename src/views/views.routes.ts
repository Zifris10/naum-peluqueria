import { Router } from 'express';
import { jwtVerifyExpireForgotPassword } from '../helpers';
import ViewsController from './views.ctrl';

const viewsRoute: Router = Router();

viewsRoute
    .get('/recuperar-contrasena', jwtVerifyExpireForgotPassword, ViewsController.updatePassword)
    .get('/login', ViewsController.login);

export default viewsRoute;