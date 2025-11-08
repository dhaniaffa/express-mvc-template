import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/httpError';
import Logger from '../utils/logger';
import { ZodError } from 'zod';
import { formatZodError } from '../utils/zodErrorFormatter';

/**
 * Middleware to handle errors
 *
 * @param err: unknown
 * @param req: Request
 * @param res: Response
 * @param _next: NextFunction
 *
 * @return Response
 */
export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  let status = res.statusCode !== 200 ? res.statusCode : 500;
  let errorMessage = 'Internal Server Error';
  let errorDetails: Record<string, unknown> = {};

  if (err instanceof HttpError) {
    status = err.status;
    errorMessage = err.message;
    errorDetails = {
      status: err.status,
      message: err.message,
      name: err.name,
    };
  } else if (err instanceof Error) {
    errorMessage = err.message;
    errorDetails = {
      name: err.name,
      stack: err.stack,
    };
  }

  // Handle ZodError for validation
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 400,
      message: 'Validation Error',
      errors: formatZodError(err),
    });
  }

  // Log error dengan detail yang berbeda berdasarkan status code
  if (status >= 500) {
    // Server errors
    Logger.error(`Server Error: ${errorMessage}`, {
      error: errorDetails,
      path: req.path,
      method: req.method,
      requestId: req.headers['x-request-id'] || 'unknown',
      body: JSON.stringify(req.body),
      query: req.query,
      params: req.params,
      stack: errorDetails.stack || 'No stack trace available',
    });
  } else if (status >= 400 && status < 500) {
    // Client errors
    Logger.warn(`Client Error: ${errorMessage}`, {
      error: errorDetails,
      path: req.path,
      method: req.method,
      requestId: req.headers['x-request-id'] || 'unknown',
      body: JSON.stringify(req.body),
      query: req.query,
      params: req.params,
    });
  }

  return res.status(status).json({
    status: status,
    message: errorMessage,
    errors: errorDetails,
  });
}
