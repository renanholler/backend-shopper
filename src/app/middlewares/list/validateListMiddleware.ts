import { NextFunction, Request, Response } from 'express';

export async function validateListMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let { measure_type } = req.query;

  if (measure_type && typeof measure_type === 'string') {
    measure_type = measure_type.toUpperCase();
    if (!['WATER', 'GAS'].includes(measure_type)) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'Tipo de medição não permitida.',
      });
    }
    req.query.measure_type = measure_type;
  }

  next();
}
