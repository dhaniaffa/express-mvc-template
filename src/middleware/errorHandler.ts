import { Request, Response, NextFunction } from 'express';

import { HttpError } from '../utils/httpError';

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  let status = res.statusCode !== 200 ? res.statusCode : 500;
  if (err instanceof HttpError) {
    status = err.status;
  }
  res.status(status).json({
    message: err instanceof Error ? err.message : 'Internal Server Error',
    status: status,
  });
}
