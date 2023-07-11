import { Router } from 'express';
import { QUERY_PARAMS, schemaAuthLogin, schemaAuthForgotPassword } from '../helpers';
import { ValidatorHandler } from '../handlers';
import AuthController from './auth.ctrl';

const authRoute: Router = Router();

authRoute
    .post('/login', ValidatorHandler.validate(schemaAuthLogin, QUERY_PARAMS.BODY), AuthController.login)
    .post('/forgot-password', ValidatorHandler.validate(schemaAuthForgotPassword, QUERY_PARAMS.BODY), AuthController.forgotPassword);

export default authRoute;