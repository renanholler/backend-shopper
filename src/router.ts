import { Router } from 'express';
import errorHandler from './app/middlewares/errorHandler';
import { confirmRoute, listRoute, uploadRoute } from './app/routes';

export const router = Router();

router.use(uploadRoute);
router.use(confirmRoute);
router.use(listRoute);

router.use(errorHandler);
