import { NextFunction, Request, Response } from 'express';

interface ApiError {
  statusCode: number;
  error_code: string;
  error_description: string;
}

const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (
    'statusCode' in err &&
    'error_code' in err &&
    'error_description' in err
  ) {
    res.status(err.statusCode).json({
      error_code: err.error_code,
      error_description: err.error_description,
    });
  } else {
    res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
      error_description: 'Ocorreu um erro inesperado no servidor.',
    });
  }
};

export default errorHandler;
