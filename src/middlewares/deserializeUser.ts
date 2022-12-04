import { NextFunction, Request, Response } from 'express';
import createSession, { verifyJwt } from '../utils/sessoionHelper';

export default function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.cookies.accessToken) return next();

  const { accessToken } = req.cookies;
  if (!accessToken) return next();

  const { decoded: accessTokenPayload } = verifyJwt(accessToken);
  if (accessTokenPayload) {
    res.locals.user = accessTokenPayload;
    return next();
  }

  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return next();

  const { decoded: refreshTokenPayload } = verifyJwt(refreshToken);
  if (!refreshTokenPayload) return next();

  const token = createSession({
    email: refreshTokenPayload.email,
    userId: refreshTokenPayload.userId,
    userProfileId: refreshTokenPayload.userProfileId,
  });
  res.cookie('accessToken', token.get('accessToken'), {
    httpOnly: true,
    sameSite: 'lax',
  });
  console.log('refrehsed');

  return next();
}
