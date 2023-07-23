import { Router } from 'express';
import { jwtVerifyTokenSuperAdmin } from '../helpers';
import UsersController from './users.ctrl';

const usersRoute: Router = Router();

usersRoute
    .get('/profile', jwtVerifyTokenSuperAdmin, UsersController.getProfile);

export default usersRoute;