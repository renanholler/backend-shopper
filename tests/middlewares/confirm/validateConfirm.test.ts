import { NextFunction, Request, Response } from 'express';
import { validateConfirm } from '../../../src/app/middlewares/confirm/validateConfirm';
import { Measure } from '../../../src/app/models/Measure';
import { createError } from '../../../src/app/utils/createError';

jest.mock('../../../src/app/models/Measure');

describe('validateConfirm Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction = jest.fn();

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {};
    jest.clearAllMocks();
  });

  it('should pass validation and call next if all data is correct', async () => {
    req.body = {
      measure_uuid: 'valid-uuid',
      confirmed_value: 100,
    };

    (Measure.findOne as jest.Mock).mockResolvedValue({
      has_confirmed: false,
    });

    await validateConfirm(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith();
  });

  it('should return an error if measure_uuid is invalid', async () => {
    req.body = {
      measure_uuid: '',
      confirmed_value: 100,
    };

    await validateConfirm(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(
      createError(400, 'INVALID_DATA', 'O ID da leitura deve ser uma string não vazia.'),
    );
  });

  it('should return an error if confirmed_value is not an integer', async () => {
    req.body = {
      measure_uuid: 'valid-uuid',
      confirmed_value: 'not-a-number',
    };

    await validateConfirm(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(
      createError(400, 'INVALID_DATA', 'O valor da leitura confirmada deve ser um número inteiro.'),
    );
  });

  it('should return an error if measure is not found', async () => {
    req.body = {
      measure_uuid: 'non-existent-uuid',
      confirmed_value: 100,
    };

    (Measure.findOne as jest.Mock).mockResolvedValue(null);

    await validateConfirm(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(createError(404, 'MEASURE_NOT_FOUND', 'Leitura não encontrada'));
  });

  it('should return an error if measure is already confirmed', async () => {
    req.body = {
      measure_uuid: 'valid-uuid',
      confirmed_value: 100,
    };

    (Measure.findOne as jest.Mock).mockResolvedValue({
      has_confirmed: true,
    });

    await validateConfirm(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(createError(409, 'CONFIRMATION_DUPLICATE', 'Leitura do mês já realizada'));
  });
});
