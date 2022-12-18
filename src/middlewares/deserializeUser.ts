import { NextFunction, Request, Response } from 'express';
import createSession, { verifyJwt } from '../utils/sessoionHelper';

export default function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const accessToken = req.headers['x-access-token'] as string;

  if (!accessToken) return next();

  if (!accessToken) return next();

  const { decoded: accessTokenPayload } = verifyJwt(accessToken);
  if (accessTokenPayload) {
    res.locals.user = accessTokenPayload;
    return next();
  }

  const refreshToken = req.headers['x-refresh-token'] as string;
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

  return next();
}
