import { Router } from 'express';
import { jwtVerifyTokenSuperAdmin, QUERY_PARAMS, schemaAppointmentID, schemaCreateAppointment } from '../helpers';
import { ValidatorHandler } from '../handlers';
import AppointmentsController from './appointments.ctrl';

const appointmentsRoute: Router = Router();

appointmentsRoute
    .delete('/:appointmentID', [
        ValidatorHandler.validate(schemaAppointmentID, QUERY_PARAMS.PARAMS),
        jwtVerifyTokenSuperAdmin
    ], AppointmentsController.delete)
    .get('/', jwtVerifyTokenSuperAdmin, AppointmentsController.list)
    .get('/:appointmentID', [
        ValidatorHandler.validate(schemaAppointmentID, QUERY_PARAMS.PARAMS),
        jwtVerifyTokenSuperAdmin
    ], AppointmentsController.findById)
    .post('/', [
        ValidatorHandler.validate(schemaCreateAppointment, QUERY_PARAMS.BODY),
        jwtVerifyTokenSuperAdmin
    ], AppointmentsController.create);

export default appointmentsRoute;