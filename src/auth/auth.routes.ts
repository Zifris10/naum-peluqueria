import { Router } from 'express';
import { QUERY_PARAMS, schemaAuthLogin, schemaAuthForgotPassword, schemaAuthUpdatePassword, jwtRefreshToken } from '../helpers';
import { ValidatorHandler } from '../handlers';
import AuthController from './auth.ctrl';

const authRoute: Router = Router();

authRoute
    .post('/refresh-token', jwtRefreshToken)
    .post('/login', ValidatorHandler.validate(schemaAuthLogin, QUERY_PARAMS.BODY), AuthController.login)
    .post('/forgot-password', ValidatorHandler.validate(schemaAuthForgotPassword, QUERY_PARAMS.BODY), AuthController.forgotPassword)
    .put('/update-password', ValidatorHandler.validate(schemaAuthUpdatePassword, QUERY_PARAMS.BODY), AuthController.updatePassword);

export default authRoute;