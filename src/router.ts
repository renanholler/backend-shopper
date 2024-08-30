import { Router } from 'express';
import { confirmRoutes, listRoutes, uploadRoutes } from './app/routes';

export const router = Router();

router.use(uploadRoutes);
router.use(confirmRoutes);
router.use(listRoutes);
