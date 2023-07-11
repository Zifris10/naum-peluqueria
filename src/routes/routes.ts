import { Router } from 'express';
import authRoute from '../auth/auth.routes';
import usersRoute from '../users/users.routes';

const mainRouter: Router = Router();

mainRouter.use('/auth', authRoute);
mainRouter.use('/users', usersRoute);

export default mainRouter;