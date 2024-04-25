import { NextFunction, Request, Response } from 'express';
import createSession, { verifyJwt } from '../utils/sessoionHelper';

export default function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return next();
  }

  const { decoded: accessTokenPayload } = verifyJwt(accessToken);
  if (!accessTokenPayload) {
    return next();
  }

  res.locals.user = accessTokenPayload;
  return next();
}
