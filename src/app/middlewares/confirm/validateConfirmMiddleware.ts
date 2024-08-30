import { NextFunction, Request, Response } from 'express';
import { Measure } from '../../models/Measure';

export async function validateConfirmMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { measure_uuid, confirmed_value } = req.body;

  if (typeof measure_uuid !== 'string' || measure_uuid.trim() === '') {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'O ID da leitura deve ser uma string não vazia.',
    });
  }

  if (
    typeof confirmed_value !== 'number' ||
    !Number.isInteger(confirmed_value)
  ) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description:
        'O valor da leitura confirmada deve ser um número inteiro.',
    });
  }

  const existingMeasure = await Measure.findOne({ measure_uuid });
  if (!existingMeasure) {
    return res.status(404).json({
      error_code: 'MEASURE_NOT_FOUND',
      error_description: 'Leitura não encontrada',
    });
  }

  if (existingMeasure.has_confirmed) {
    return res.status(404).json({
      error_code: 'CONFIRMATION_DUPLICATE',
      error_description: 'Leitura do mês já realizada',
    });
  }

  next();
}
