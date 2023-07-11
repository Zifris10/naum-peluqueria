import { Router } from 'express';
import { jwtVerifyTokenSuperAdmin, QUERY_PARAMS, schemaUsersUpdateProfile } from '../helpers';
import { ValidatorHandler } from '../handlers';
import UsersController from './users.ctrl';

const usersRoute: Router = Router();

usersRoute
    .get('/profile', jwtVerifyTokenSuperAdmin, UsersController.getProfile)
    .put('/profile', [
        ValidatorHandler.validate(schemaUsersUpdateProfile, QUERY_PARAMS.BODY),
        jwtVerifyTokenSuperAdmin
    ], UsersController.updateProfile);

export default usersRoute;