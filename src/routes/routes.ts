import { Router } from 'express';
import authRoute from '../auth/auth.routes';
import usersRoute from '../users/users.routes';
import appointmentsRoute from '../appointments/appointments.routes';
import inventoryRoute from '../inventory/inventory.routes';

const mainRouter: Router = Router();

mainRouter.use('/auth', authRoute);
mainRouter.use('/users', usersRoute);
mainRouter.use('/appointments', appointmentsRoute);
mainRouter.use('/inventory', inventoryRoute);

export default mainRouter;