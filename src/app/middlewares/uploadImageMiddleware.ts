import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { uploadImage } from '../services/geminiUploadService';

export async function uploadImageMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { image, mime_type } = req.body;
  const tempFilePath = path.join(__dirname, `temp_image.${mime_type}`);
  fs.writeFileSync(tempFilePath, image);
  req.body.image_url = await uploadImage(tempFilePath, 'Bill', mime_type);
  fs.unlinkSync(tempFilePath);
  next();
}
