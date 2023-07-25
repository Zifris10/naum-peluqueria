import { Router } from 'express';
import { jwtVerifyTokenSuperAdmin, QUERY_PARAMS, schemaAppointmentID, schemaCreateAppointment, schemaCompleteAppointment } from '../helpers';
import { ValidatorHandler } from '../handlers';
import AppointmentsController from './appointments.ctrl';

const appointmentsRoute: Router = Router();

appointmentsRoute
    .delete('/:appointmentID', [
        ValidatorHandler.validate(schemaAppointmentID, QUERY_PARAMS.PARAMS),
        jwtVerifyTokenSuperAdmin
    ], AppointmentsController.delete)
    .get('/', jwtVerifyTokenSuperAdmin, AppointmentsController.list)
    .get('/history', jwtVerifyTokenSuperAdmin, AppointmentsController.history)
    .post('/', [
        ValidatorHandler.validate(schemaCreateAppointment, QUERY_PARAMS.BODY),
        jwtVerifyTokenSuperAdmin
    ], AppointmentsController.create)
    .put('/:appointmentID/complete', [
        ValidatorHandler.validate(schemaAppointmentID, QUERY_PARAMS.PARAMS),
        ValidatorHandler.validate(schemaCompleteAppointment, QUERY_PARAMS.BODY),
        jwtVerifyTokenSuperAdmin
    ], AppointmentsController.complete);

export default appointmentsRoute;