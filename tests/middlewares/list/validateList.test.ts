import { NextFunction, Request, Response } from 'express';
import { validateList } from '../../../src/app/middlewares/list/validateList';
import { createError } from '../../../src/app/utils/createError';

describe('validateList Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction = jest.fn();

  beforeEach(() => {
    req = {
      query: {},
    };
    res = {};
    jest.clearAllMocks();
  });

  it('should call next if measure_type is valid', () => {
    req.query = {
      measure_type: 'WATER',
    };

    validateList(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith();
  });

  it('should return an error if measure_type is invalid', () => {
    req.query = {
      measure_type: 'INVALID',
    };

    validateList(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(
      createError(400, 'INVALID_DATA', 'Tipo de medição não permitida.'),
    );
  });

  it('should uppercase measure_type and call next', () => {
    req.query = {
      measure_type: 'water',
    };

    validateList(req as Request, res as Response, next);

    expect(req.query.measure_type).toBe('WATER');
    expect(next).toHaveBeenCalledWith();
  });
});
