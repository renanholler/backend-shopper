import { NextFunction, Request, Response } from 'express';
import { extractMimeType } from '../../utils/base64Validator';
import { convertBase64ToBuffer } from '../../utils/convertBase64ToBuffer';
import { createError } from '../../utils/createError';

export function base64ToBuffer(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { image } = req.body;
  if (!image) {
    return next(createError(400, 'IMAGE_NOT_PROVIDED', 'Image not provided'));
  }
  req.body.mime_type = extractMimeType(image);
  req.body.image = convertBase64ToBuffer(image);
  next();
}
