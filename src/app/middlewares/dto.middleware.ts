import { NextFunction, Request, RequestHandler, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { sanitize } from 'class-sanitizer';

function dtoValidationMiddleware(type: any, skipMissingProperties = false): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToClass(type, req.body);
    validate(dtoObj, { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          let dtoErrors: any = [];
          errors.forEach((error: ValidationError) =>
            (Object as any).values(error.constraints).forEach((k: any) => {
              dtoErrors.push({ message: k });
            }),
          );
          throw new Error(JSON.stringify(dtoErrors));
        } else {
          //sanitize the object and call the next middleware
          sanitize(dtoObj);
          next();
        }
      })
      .catch((e) => res.status(400).json({ errors: JSON.parse(e.message), success: false }));
  };
}

export default dtoValidationMiddleware;
