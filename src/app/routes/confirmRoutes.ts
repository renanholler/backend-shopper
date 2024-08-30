import { Router } from 'express';
import { validateConfirmMiddleware } from '../middlewares/confirm/validateConfirmMiddleware';
import { confirmMeasure } from '../useCases/Measures';

export const confirmRoutes = Router();

confirmRoutes.patch('/confirm', validateConfirmMiddleware, confirmMeasure);
