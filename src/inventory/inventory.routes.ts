import { Router } from 'express';
import { jwtVerifyTokenSuperAdmin, QUERY_PARAMS, schemaInventoryID, schemaCreateInventory } from '../helpers';
import { ValidatorHandler } from '../handlers';
import InventoryController from './inventory.ctrl';

const inventoryRoute: Router = Router();

inventoryRoute
    .delete('/:inventoryID', [
        ValidatorHandler.validate(schemaInventoryID, QUERY_PARAMS.PARAMS),
        jwtVerifyTokenSuperAdmin
    ], InventoryController.delete)
    .get('/', jwtVerifyTokenSuperAdmin, InventoryController.list)
    .post('/', [
        ValidatorHandler.validate(schemaCreateInventory, QUERY_PARAMS.BODY),
        jwtVerifyTokenSuperAdmin
    ], InventoryController.create);

export default inventoryRoute;