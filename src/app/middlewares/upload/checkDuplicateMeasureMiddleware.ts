import { NextFunction, Request, Response } from 'express';
import { Measure } from '../../models/Measure';

export async function checkDuplicateMeasureMiddleware(
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
      return res.status(409).json({
        error_code: 'DOUBLE_REPORT',
        error_description: 'Leitura do mês já realizada',
      });
    }

    next();
  } catch (error) {
    console.error('Erro ao verificar duplicação:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
