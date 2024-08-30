import { Router } from 'express';
import {
  base64ToBuffer,
  checkDuplicateMeasure,
  getMeasureValue,
  uploadBill,
  validateUpload,
} from '../middlewares/upload';
import { uploadMeasure } from '../useCases/Measures';

export const uploadRoute = Router();

uploadRoute.post(
  '/upload',
  validateUpload,
  checkDuplicateMeasure,
  base64ToBuffer,
  uploadBill,
  getMeasureValue,
  uploadMeasure,
);
