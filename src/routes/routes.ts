import { Router } from 'express';
import authRoute from '../auth/auth.routes';
import usersRoute from '../users/users.routes';
import appointmentsRoute from '../appointments/appointments.routes';
import inventoryRoute from '../inventory/inventory.routes';
import inventoryHistoryRoute from '../inventoryHistory/inventory.history.routes';

const mainRouter: Router = Router();

mainRouter.use('/auth', authRoute);
mainRouter.use('/users', usersRoute);
mainRouter.use('/appointments', appointmentsRoute);
mainRouter.use('/inventory', inventoryRoute);
mainRouter.use('/inventory-history', inventoryHistoryRoute);

export default mainRouter;