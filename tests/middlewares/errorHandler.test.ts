// /tests/middlewares/errorHandler.test.ts
import { NextFunction, Request, Response } from 'express';
import errorHandler from '../../src/app/middlewares/errorHandler';

describe('errorHandler Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    next = jest.fn();

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should respond with the provided error details if error is an ApiError', () => {
    const error = {
      statusCode: 400,
      error_code: 'INVALID_DATA',
      error_description: 'Invalid data provided.',
    };

    errorHandler(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error_code: 'INVALID_DATA',
      error_description: 'Invalid data provided.',
    });
  });

  it('should respond with a 500 error for generic errors', () => {
    const error = new Error('Unexpected error');

    errorHandler(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error_code: 'INTERNAL_SERVER_ERROR',
      error_description: 'Ocorreu um erro inesperado no servidor.',
    });
  });
});
