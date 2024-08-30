import { Router } from 'express';
import { validateList } from '../middlewares/list/validateList';
import { listMeasures } from '../useCases/Measures';

export const listRoute = Router();

listRoute.get('/:customer_code/list', validateList, listMeasures);
