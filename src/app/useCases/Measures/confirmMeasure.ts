import { NextFunction, Request, Response } from 'express';
import { Measure } from '../../models/Measure';
import { createError } from '../../utils/createError';

export async function confirmMeasure(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { confirmed_value, measure_uuid } = req.body;
    const measure = await Measure.findOne({ measure_uuid });
    measure!.measure_value = confirmed_value;
    measure!.has_confirmed = true;
    await measure!.save();
    res.status(200).send({ success: true });
  } catch (error) {
    console.error('Error confirming measure:', error);
    next(
      createError(500, 'INTERNAL_SERVER_ERROR', 'Erro interno do servidor.'),
    );
  }
}
