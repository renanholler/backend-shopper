import { NextFunction, Request, Response } from 'express';
import { isValidBase64 } from '../../utils/base64Validator';
import { createError } from '../../utils/createError';

export function validateUpload(req: Request, res: Response, next: NextFunction) {
  const { image, customer_code, measure_datetime, measure_type } = req.body;
  if (typeof image !== 'string' || !isValidBase64(image)) {
    return next(createError(400, 'INVALID_DATA', 'A imagem fornecida não é um base64 válido.'));
  }

  if (typeof customer_code !== 'string' || customer_code.trim() === '') {
    return next(createError(400, 'INVALID_DATA', 'O código do cliente deve ser uma string não vazia.'));
  }

  const date = new Date(measure_datetime);
  if (typeof measure_datetime !== 'string' || isNaN(date.getTime())) {
    return next(createError(400, 'INVALID_DATA', 'A data da medida deve ser uma string válida no formato de data.'));
  }

  const validMeasureTypes = ['WATER', 'GAS'];
  if (typeof measure_type !== 'string' || !validMeasureTypes.includes(measure_type)) {
    return next(createError(400, 'INVALID_DATA', "O tipo de medida deve ser 'WATER' ou 'GAS'."));
  }

  next();
}
