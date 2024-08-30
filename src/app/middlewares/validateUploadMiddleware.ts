// validateUploadMiddleware.ts
import { NextFunction, Request, Response } from 'express';
import { isValidBase64 } from '../utils/base64Validator';

export function validateUploadMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { image, customer_code, measure_datetime, measure_type } = req.body;

  // Validação do campo image
  if (typeof image !== 'string' || !isValidBase64(image)) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'A imagem fornecida não é um base64 válido.',
    });
  }

  // Validação do campo customer_code
  if (typeof customer_code !== 'string' || customer_code.trim() === '') {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'O código do cliente deve ser uma string não vazia.',
    });
  }

  // Validação do campo measure_datetime
  const date = new Date(measure_datetime);
  if (typeof measure_datetime !== 'string' || isNaN(date.getTime())) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description:
        'A data da medida deve ser uma string válida no formato de data.',
    });
  }

  // Validação do campo measure_type
  const validMeasureTypes = ['WATER', 'GAS'];
  if (
    typeof measure_type !== 'string' ||
    !validMeasureTypes.includes(measure_type)
  ) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'O tipo de medida deve ser "WATER" ou "GAS".',
    });
  }

  next();
}
