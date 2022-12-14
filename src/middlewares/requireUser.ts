import { NextFunction, Request, Response } from 'express';

export default function requireUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!res.locals.user) {
    return res.sendStatus(403);
  }
  return next();
}
