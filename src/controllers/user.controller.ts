import { Request, Response } from 'express';
import {
  TCreateUserInput,
  TCreateUserProfileIntput,
} from '../schemas/user.schema';
import { createUser, createUserProfile } from '../services/user.service';
import createSession from '../utils/sessoionHelper';
import { hashPassword } from '../utils/userHelper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { constraintError } from '../utils/validateAndThrow';
import { generateUsername } from '../utils/userHelper';

export async function createUserHandler(
  req: Request<{}, {}, Required<TCreateUserInput['body']>> & {
    user?: { email: string };
  },
  res: Response<
    Omit<
      Required<TCreateUserInput['body']>,
      'password' | 'passwordConfirmation'
    > & { username: string; userId: number; userProfileId: number }
  >,
) {
  const { email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const user = await createUser({
      email,
      password: hashedPassword,
      username: generateUsername(),
    });
    const token = createSession({
      email: user.email,
      userId: user.id,
      userProfileId: user.UserProfile[0].id,
    });

    res.cookie('refreshToken', token.get('refreshToken'), {
      httpOnly: true,
      sameSite: 'lax',
    });
    res.cookie('accessToken', token.get('accessToken'), {
      httpOnly: true,
      sameSite: 'lax',
    });
    return res.status(201).json({
      email: user.email,
      userId: user.id,
      userProfileId: user.UserProfile[0].id,
      username: user.UserProfile[0].username,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

export async function createUserProfileHandler(
  req: Request<{}, {}, Required<TCreateUserProfileIntput['body']>>,
  res: Response<{}, { user: { userId: number; email: string } }>,
) {
  try {
    const result = await createUserProfile({
      userId: res.locals.user.userId,
      ...req.body,
    });

    return res.status(201).json({
      username: result.username,
      message: 'success',
    });
  } catch (error) {
    let e: { message: string; code: number };

    if (error instanceof PrismaClientKnownRequestError) {
      e = constraintError({ prismaErrCode: error.code, meta: error.meta });
    }

    return res.status(e.code).json({ message: e.message });
  }
}
