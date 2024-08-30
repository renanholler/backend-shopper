import { Router } from 'express';
import { validateListMiddleware } from '../middlewares/list/validateListMiddleware';
import { listMeasures } from '../useCases/Measures';

export const listRoutes = Router();

listRoutes.get('/:customer_code/list', validateListMiddleware, listMeasures);
