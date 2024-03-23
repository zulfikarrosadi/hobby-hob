import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import GeneralResponse from '../schemas/responses.schema';

export function validateInput(schema: AnyZodObject) {
  return function (
    req: Request,
    res: Response<GeneralResponse>,
    next: NextFunction,
  ) {
    try {
      schema.parse(req.body);
      return next();
    } catch (error: any) {
      console.log(error);
      return res.status(400).send({
        status: 'fail',
        errors: {
          message: 'validation errors',
          code: 400,
          details: error.errors.map((e: any) => {
            return {
              message: e.message,
              path: e.path[0],
            };
          }),
        },
      });
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
    message = 'This username already taken';
  }
  if (error.meta.target === 'users_email_key') {
    message = 'This user is already registered';
  }

  return { message, code };
}
