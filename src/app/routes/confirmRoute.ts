import { Router } from 'express';
import { validateConfirm } from '../middlewares/confirm/validateConfirm';
import { confirmMeasure } from '../useCases/Measures';

export const confirmRoute = Router();

confirmRoute.patch('/confirm', validateConfirm, confirmMeasure);
