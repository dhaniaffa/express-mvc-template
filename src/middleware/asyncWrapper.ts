import { RequestHandler, Request, Response, NextFunction } from 'express';

/**
 * Wraps a function that returns a Promise or a value in an Express middleware
 * function. If the function returns a Promise, it will be resolved and the
 * value will be passed to the next middleware function. If the function
 * returns a value, it will be passed to the next middleware function.
 * If the function throws an error, it will be passed to the next error
 * handling middleware function.
 *
 * @template T
 * @param {function} fn - A function that returns a Promise or a value.
 * @returns {RequestHandler} - An Express middleware function.
 */
export const asyncWrapper = <T = string>(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<T> | T,
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
