import c from 'config';
import { Request } from 'express';
import { createJwt, verifyJwt } from './jwtUtil';

export default function createSession({
  email,
  userId,
  userProfileId,
  newRefreshToken = true,
}: {
  email: string;
  userId: number;
  userProfileId: number;
  newRefreshToken?: boolean;
}): Map<'accessToken' | 'refreshToken', string> {
  const token = new Map<'accessToken' | 'refreshToken', string>();
  token.set(
    'accessToken',
    createJwt(
      { email, userId, userProfileId, isValid: true },
      { expiresIn: c.get<string>('accessTokenTtl') },
    ),
  );

  if (newRefreshToken) {
    token.set(
      'refreshToken',
      createJwt(
        { email, userId, userProfileId, isValid: true },
        { expiresIn: c.get('refreshTokenTtl') },
      ),
    );
  }

  return token;
}

export function deleteSession(req: Request) {
  const { accessToken: token } = req.cookies;
  const { decoded: accessTokenPayload } = verifyJwt(token);

  accessTokenPayload.isValid = false;
  accessTokenPayload.email = null;
  accessTokenPayload.userId = null;

  const newToken = createJwt({ ...accessTokenPayload });
  return newToken;
}
