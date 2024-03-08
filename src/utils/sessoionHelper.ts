import c from 'config';
import { Request } from 'express';
import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';

type TJwtPayload = Pick<
  JwtPayload,
  'email' | 'userId' | 'isValid' | 'userProfileId'
>;

export function createJwt(
  payload: {
    email: string;
    userId: number;
    userProfileId: number;
    isValid: boolean;
  },
  options?: Omit<SignOptions, 'algorithm'>,
) {
  const token = sign({ ...payload }, c.get('privateKay'), {
    ...(options && options),
    algorithm: 'HS256',
  });

  return token;
}

export function verifyJwt(token: string): {
  decoded: TJwtPayload | null;
} {
  try {
    const decoded = verify(token, c.get('privateKay')) as TJwtPayload;
    if (!decoded.isValid) throw Error;
    return { decoded };
  } catch (error) {
    console.log('jwt not valid ', error);

    return { decoded: null };
  }
}

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
  if (!accessTokenPayload) {
    return '';
  }
  accessTokenPayload.isValid = false;
  accessTokenPayload.email = null;
  accessTokenPayload.userId = null;

  const newToken = createJwt({ ...accessTokenPayload });
  return newToken;
}
