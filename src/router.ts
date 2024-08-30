import { Router } from 'express';
import {
  base64ToBufferMiddleware,
  validateUploadMiddleware,
} from './app/middlewares';
import { getMeasureValueMiddleware } from './app/middlewares/getMeasureValueMiddleware';
import { uploadImageMiddleware } from './app/middlewares/uploadImageMiddleware';
import {
  confirmMeasure,
  listMeasure,
  uploadMeasure,
} from './app/useCases/Measures';

export const router = Router();

router.post(
  '/upload',
  validateUploadMiddleware,
  base64ToBufferMiddleware,
  uploadImageMiddleware,
  getMeasureValueMiddleware,
  uploadMeasure,
);

router.patch('/confirm', confirmMeasure);

router.get('/:customer_code/list', listMeasure);
