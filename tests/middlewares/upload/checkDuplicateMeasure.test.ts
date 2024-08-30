import { NextFunction, Request, Response } from 'express';
import { checkDuplicateMeasure } from '../../../src/app/middlewares/upload/checkDuplicateMeasure';
import { Measure } from '../../../src/app/models/Measure';
import { createError } from '../../../src/app/utils/createError';

jest.mock('../../../src/app/models/Measure', () => ({
  Measure: {
    findOne: jest.fn(),
  },
}));

describe('checkDuplicateMeasure Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction = jest.fn();

  beforeEach(() => {
    req = {
      body: {
        customer_code: 'customer1',
        measure_datetime: '2024-08-30T00:00:00Z',
        measure_type: 'WATER',
      },
    };
    res = {};
    jest.clearAllMocks();
  });

  it('should call next with no errors if no duplicate measure is found', async () => {
    (Measure.findOne as jest.Mock).mockResolvedValue(null);

    await checkDuplicateMeasure(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith();
  });

  it('should call next with an error if a duplicate measure is found', async () => {
    // Mock para findOne retornar um objeto, simulando duplicação encontrada
    (Measure.findOne as jest.Mock).mockResolvedValue({});

    await checkDuplicateMeasure(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(
      createError(409, 'DOUBLE_REPORT', 'Leitura do mês já realizada'),
    );
  });

  it('should handle errors and call next with a server error', async () => {
    (Measure.findOne as jest.Mock).mockRejectedValue(
      new Error('Database error'),
    );

    await checkDuplicateMeasure(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(
      createError(500, 'INTERNAL_SERVER_ERROR', 'Erro interno do servidor'),
    );
  });
});
