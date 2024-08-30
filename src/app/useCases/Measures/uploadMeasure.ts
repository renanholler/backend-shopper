import { Request, Response } from 'express';
import { Measure } from '../../models/Measure';

export async function uploadMeasure(req: Request, res: Response) {
  const {
    image_url,
    measure_value,
    customer_code,
    measure_datetime,
    measure_type,
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
}
