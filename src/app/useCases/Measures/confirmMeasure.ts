import { Request, Response } from 'express';
import { Measure } from '../../models/Measure';

export async function confirmMeasure(req: Request, res: Response) {
  try {
    const { confirmed_value, measure_uuid } = req.body;

    const measure = await Measure.findOne({ measure_uuid });
    measure!.measure_value = confirmed_value;
    measure!.has_confirmed = true;
    measure!.save();
    res.status(200).send({ success: true });
  } catch (error) {
    console.error('Error confirming measure:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
