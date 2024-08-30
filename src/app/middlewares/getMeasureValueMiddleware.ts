import { NextFunction, Request, Response } from 'express';
import { analyzeImage } from '../services/geminiAnalysisService';

export async function getMeasureValueMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { image_url, mime_type } = req.body;
  req.body.measure_value = await analyzeImage(image_url, mime_type);
  next();
}
