import { Request, Response } from 'express';
import { Measure } from '../../models/Measure';

export async function uploadMeasure(req: Request, res: Response) {
  try {
    const {
      image_url,
      customer_code,
      measure_datetime,
      measure_type,
      measure_value,
    } = req.body;

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
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
