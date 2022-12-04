import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export function validateInput(schema: AnyZodObject) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      schema.parse({ body: req.body });
      return next();
    } catch (error) {
      return res.status(400).send(error.errors);
    }
  };
}

export function constraintError(error: {
  prismaErrCode: string;
  meta: Record<string, unknown>;
}) {
  let message: string;
  let code: number = 400;

  if (error.prismaErrCode !== 'P2002') {
    message = 'cannot complete the request, please try again';
  }
  if (error.meta.target === 'user_profile_userId_key') {
    message = 'This user is already registered';
  }
  if (error.meta.target === 'user_profile_username_key') {
    this.message = 'This username already taken';
  }

  return { message, code };
}
