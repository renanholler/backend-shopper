import { NextFunction, Request, Response } from 'express';
import { extractMimeType } from '../utils/base64Validator';
import { convertBase64ToBuffer } from '../utils/convertBase64ToBuffer';

export function base64ToBufferMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { image } = req.body;
  req.body.mime_type = extractMimeType(image);
  req.body.image = convertBase64ToBuffer(image);
  next();
}
