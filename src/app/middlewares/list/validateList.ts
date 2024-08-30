import { NextFunction, Request, Response } from 'express';
import { createError } from '../../utils/createError';

export async function validateList(req: Request, res: Response, next: NextFunction) {
  let { measure_type } = req.query;

  if (measure_type && typeof measure_type === 'string') {
    measure_type = measure_type.toUpperCase();
    if (!['WATER', 'GAS'].includes(measure_type)) {
      return next(createError(400, 'INVALID_DATA', 'Tipo de medição não permitida.'));
    }
    req.query.measure_type = measure_type;
  }

  next();
}
