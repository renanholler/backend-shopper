import { NextFunction, Request, Response } from 'express';
import { analyzeImage } from '../../services/geminiAnalysisService';

export async function getMeasureValueMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { image_url, mime_type } = req.body;
  const value = await analyzeImage(image_url, mime_type);
  req.body.measure_value = parseInt(value);
  next();
}
