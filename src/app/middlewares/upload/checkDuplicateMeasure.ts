import { NextFunction, Request, Response } from 'express';
import { Measure } from '../../models/Measure';
import { createError } from '../../utils/createError';

export async function checkDuplicateMeasure(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { customer_code, measure_datetime, measure_type } = req.body;

  try {
    const date = new Date(measure_datetime);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;

    const existingMeasure = await Measure.findOne({
      customer_code,
      measure_type,
      $expr: {
        $and: [
          { $eq: [{ $year: '$measure_datetime' }, year] },
          { $eq: [{ $month: '$measure_datetime' }, month] },
        ],
      },
    });

    if (existingMeasure) {
      return next(
        createError(409, 'DOUBLE_REPORT', 'Leitura do mês já realizada'),
      );
    }

    next();
  } catch (error) {
    console.error('Erro ao verificar duplicação:', error);
    next(createError(500, 'INTERNAL_SERVER_ERROR', 'Erro interno do servidor'));
  }
}
