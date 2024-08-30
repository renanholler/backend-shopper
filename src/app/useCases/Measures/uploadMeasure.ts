import { NextFunction, Request, Response } from 'express';
import { Measure } from '../../models/Measure';
import { createError } from '../../utils/createError';

export async function uploadMeasure(req: Request, res: Response, next: NextFunction) {
  try {
    const { image_url, customer_code, measure_datetime, measure_type, measure_value } = req.body;

    const measure = new Measure({
      image_url,
      customer_code,
      measure_datetime: new Date(measure_datetime),
      measure_type,
      measure_value,
    });

    await measure.save();

    res.status(200).send({
      image_url,
      measure_value,
      measure_uuid: measure.measure_uuid,
    });
  } catch (error) {
    console.error('Error uploading measure:', error);
    next(createError(500, 'INTERNAL_SERVER_ERROR', 'Erro interno do servidor.'));
  }
}
