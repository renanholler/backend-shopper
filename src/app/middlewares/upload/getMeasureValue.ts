// /src/middlewares/upload/getMeasureValue.ts
import { NextFunction, Request, Response } from 'express';
import { analyzeImage } from '../../services/geminiAnalysisService';
import { createError } from '../../utils/createError';

export const getMeasureValue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { image_url, mime_type } = req.body;
    const value = await analyzeImage(image_url, mime_type);
    req.body.measure_value = parseFloat(value);
    next();
  } catch (error) {
    console.error('Erro ao analisar imagem:', error);
    next(
      createError(500, 'ANALYZE_IMAGE_FAILED', 'Falha ao analisar a imagem.'),
    );
  }
};
