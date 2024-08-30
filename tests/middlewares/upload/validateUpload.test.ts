import { NextFunction, Request, Response } from 'express';
import { validateUpload } from '../../../src/app/middlewares/upload/validateUpload';
import { createError } from '../../../src/app/utils/createError';

jest.mock('../../../src/app/utils/createError');
const mockCreateError = createError as jest.Mock;

describe('validateUpload Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { body: {} };
    res = {};
    next = jest.fn();
    mockCreateError.mockImplementation((status, code, message) => ({
      status,
      code,
      message,
    }));
  });

  it('should call next with error if image is not valid base64', () => {
    req.body = {
      image: 'invalid_base64',
      customer_code: 'valid_code',
      measure_datetime: '2024-08-30T12:00:00Z',
      measure_type: 'WATER',
    };

    validateUpload(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'A imagem fornecida não é um base64 válido.',
      }),
    );
  });

  it('should call next with error if customer_code is invalid', () => {
    req.body = {
      image: 'data:image/png;base64,valid_base64_string', // Assume que esta é uma string base64 válida
      customer_code: '',
      measure_datetime: '2024-08-30T12:00:00Z',
      measure_type: 'WATER',
    };

    validateUpload(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'O código do cliente deve ser uma string não vazia.',
      }),
    );
  });

  it('should call next with error if measure_datetime is invalid', () => {
    req.body = {
      image: 'data:image/png;base64,valid_base64_string',
      customer_code: 'valid_code',
      measure_datetime: 'invalid_date',
      measure_type: 'WATER',
    };

    validateUpload(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message:
          'A data da medida deve ser uma string válida no formato de data.',
      }),
    );
  });

  it('should call next with error if measure_type is invalid', () => {
    req.body = {
      image: 'data:image/png;base64,valid_base64_string',
      customer_code: 'valid_code',
      measure_datetime: '2024-08-30T12:00:00Z',
      measure_type: 'INVALID_TYPE',
    };

    validateUpload(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "O tipo de medida deve ser 'WATER' ou 'GAS'.",
      }),
    );
  });

  it('should call next without error if all fields are valid', () => {
    req.body = {
      image: 'data:image/png;base64,valid_base64_string',
      customer_code: 'valid_code',
      measure_datetime: '2024-08-30T12:00:00Z',
      measure_type: 'WATER',
    };

    validateUpload(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith();
  });
});
