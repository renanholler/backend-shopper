import { NextFunction, Request, Response } from 'express';
import { Measure } from '../../models/Measure';
import { createError } from '../../utils/createError';

export async function validateConfirm(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { measure_uuid, confirmed_value } = req.body;
  if (typeof measure_uuid !== 'string' || measure_uuid.trim() === '') {
    return next(
      createError(
        400,
        'INVALID_DATA',
        'O ID da leitura deve ser uma string não vazia.',
      ),
    );
  }
  if (
    typeof confirmed_value !== 'number' ||
    !Number.isInteger(confirmed_value)
  ) {
    return next(
      createError(
        400,
        'INVALID_DATA',
        'O valor da leitura confirmada deve ser um número inteiro.',
      ),
    );
  }

  try {
    const existingMeasure = await Measure.findOne({ measure_uuid });
    if (!existingMeasure) {
      return next(
        createError(404, 'MEASURE_NOT_FOUND', 'Leitura não encontrada'),
      );
    }
    if (existingMeasure.has_confirmed) {
      return next(
        createError(
          409,
          'CONFIRMATION_DUPLICATE',
          'Leitura do mês já realizada',
        ),
      );
    }
    next();
  } catch (error) {
    console.error('Erro ao validar confirmação:', error);
    next(createError(500, 'INTERNAL_SERVER_ERROR', 'Erro interno do servidor'));
  }
}
