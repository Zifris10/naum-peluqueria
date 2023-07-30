import { Router } from 'express';
import { jwtVerifyTokenSuperAdmin, QUERY_PARAMS, schemaCreateInventoryHistory } from '../helpers';
import { ValidatorHandler } from '../handlers';
import InventoryHistoryController from './inventory.history.ctrl';

const inventoryHistoryRoute: Router = Router();

inventoryHistoryRoute
    .get('/', jwtVerifyTokenSuperAdmin, InventoryHistoryController.list)
    .post('/', [
        ValidatorHandler.validate(schemaCreateInventoryHistory, QUERY_PARAMS.BODY),
        jwtVerifyTokenSuperAdmin
    ], InventoryHistoryController.create);

export default inventoryHistoryRoute;