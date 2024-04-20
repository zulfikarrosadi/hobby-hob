import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import { TLoginInput } from '../schemas/auth.schema';
import { findUserByEmail } from '../services/auth.service';
import createSession, { deleteSession } from '../utils/sessoionHelper';
import GeneralResponse from '../schemas/responses.schema';
import c from 'config';

export async function loginUserHandler(
  req: Request<{}, {}, TLoginInput>,
  res: Response<GeneralResponse>,
) {
  const { email, password } = req.body;
  try {
    email.toLowerCase();
    const user = await findUserByEmail({ email });
    if (!user) {
      throw new Error('user not found');
    }
    const isPasswordVerified = await compare(password, user.password);

    if (!isPasswordVerified) throw Error('Email or Password is wrong');
    const token = createSession({
      email: user.email,
      userId: user.id,
      userProfileId: user.UserProfile[0].id,
    });

    res.cookie('refreshToken', token.get('refreshToken'), {
      httpOnly: true,
      sameSite: 'none',
      path: '/auth/refresh',
      secure: true,
      maxAge: c.get('refreshTokenTtl'),
    });
    res.cookie('accessToken', token.get('accessToken'), {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: c.get('accessTokenTtl'),
    });

    return res.status(200).json({
      status: 'success',
      data: {
        user: {
          email: user.email,
          id: user.id,
          username: user.UserProfile[0].username,
          userProfileId: user.UserProfile[0].id,
        },
      },
    });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({
      status: 'fail',
      errors: { code: 400, message: error.message },
    });
  }
}

export async function logOutUserHandler(
  req: Request,
  res: Response<GeneralResponse>,
) {
  try {
    const invalidToken = deleteSession(req);

    return res
      .status(200)
      .cookie('refreshToken', '', {
        maxAge: 0,
        sameSite: 'lax',
        httpOnly: true,
      })
      .cookie('accessToken', '', {
        maxAge: 0,
        sameSite: 'lax',
        httpOnly: true,
      })
      .json({ status: 'success' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      errors: { code: 500, message: 'logout failed, please try again later' },
    });
  }
}
