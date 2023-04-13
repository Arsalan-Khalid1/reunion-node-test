import { NextFunction, Request, Response } from 'express';
import { ErrorFormattingService } from '../services/error.service';

const errorFormattingService = new ErrorFormattingService()

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {

  const formattedError = errorFormattingService.formatError(error);
  console.error(error)
  return res.status(formattedError.statusCode).json({errors: formattedError.errors ?? formattedError.message, success: false, type: formattedError.type ?? "basic"});
};
