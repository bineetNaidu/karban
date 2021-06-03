import { NextFunction, Response, Request } from 'express';
import CustomError from './CustomError';

// @ts-ignore
const ExpressErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }

  res.status(400).json({
    errors: [{ message: err.message || 'Something went Wrong' }],
  });
};

export default ExpressErrorHandler;
