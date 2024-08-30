import { NextFunction, Request, Response } from 'express';
import { Measure } from '../../models/Measure';
import { createError } from '../../utils/createError';

export async function listMeasures(req: Request, res: Response, next: NextFunction) {
  try {
    const { customer_code } = req.params;
    const { measure_type } = req.query;
    const measures = await Measure.find(measure_type ? { customer_code, measure_type } : { customer_code });
    if (measures.length === 0) {
      return next(createError(404, 'MEASURES_NOT_FOUND', 'Nenhuma leitura encontrada.'));
    }

    res.status(200).json({
      customer_code,
      measures: measures.map(({ measure_uuid, measure_datetime, measure_type, has_confirmed, image_url }) => ({
        measure_uuid,
        measure_datetime,
        measure_type,
        has_confirmed,
        image_url,
      })),
    });
  } catch (error) {
    console.error('Error listing measures:', error);
    next(createError(500, 'INTERNAL_SERVER_ERROR', 'Erro interno do servidor.'));
  }
}
