import { Router } from 'express';
import {
  base64ToBufferMiddleware,
  checkDuplicateMeasureMiddleware,
  getMeasureValueMiddleware,
  uploadImageMiddleware,
  validateUploadMiddleware,
} from '../middlewares/upload';
import { uploadMeasure } from '../useCases/Measures';

export const uploadRoutes = Router();

uploadRoutes.post(
  '/upload',
  validateUploadMiddleware,
  checkDuplicateMeasureMiddleware,
  base64ToBufferMiddleware,
  uploadImageMiddleware,
  getMeasureValueMiddleware,
  uploadMeasure,
);
