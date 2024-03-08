import { Request, Response } from 'express';
import {
  TCreateUserInput,
  TCreateUserProfileIntput,
} from '../schemas/user.schema';
import {
  createUser,
  createUserProfile,
  getUserProfile,
} from '../services/user.service';
import createSession, { setExpiredDate } from '../utils/sessoionHelper';
import { hashPassword, mappingUserHobby } from '../utils/userHelper';
import { generateUsername } from '../utils/userHelper';
import GeneralResponse from '../schemas/responses.schema';

export async function createUserHandler(
  req: Request<{}, {}, Required<TCreateUserInput['body']>> & {
    user?: { email: string };
  },
  res: Response<GeneralResponse>,
) {
  const { email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const user = await createUser({
      email,
      password: hashedPassword,
      username: generateUsername(),
    });
    if (user instanceof Error) {
      throw new Error(user.message);
    }
    const token = createSession({
      email: user.email,
      userId: user.id,
      userProfileId: user.UserProfile[0].id,
    });

    res.cookie('refreshToken', token.get('refreshToken'), {
      httpOnly: true,
      sameSite: 'none',
      path: '/auth/refresh',
      expires: setExpiredDate({ day: 15 }),
    });
    res.cookie('accessToken', token.get('accessToken'), {
      httpOnly: true,
      sameSite: 'none',
      expires: setExpiredDate({ hour: 1 }),
    });
    return res.status(201).json({
      status: 'success',
      data: {
        user: {
          email: user.email,
          id: user.id,
          userProfileId: user.UserProfile[0].id,
          username: user.UserProfile[0].username,
          accessToken: token.get('accessToken'),
          refreshToken: token.get('refreshToken'),
        },
      },
    });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({
      status: 'fail',
      errors: [{ code: 400, message: error.message }],
    });
  }
}

export async function createUserProfileHandler(
  req: Request<{}, {}, Required<TCreateUserProfileIntput['body']>>,
  res: Response<GeneralResponse, { user: { userId: number; email: string } }>,
) {
  try {
    const result = await createUserProfile({
      userId: res.locals.user.userId,
      ...req.body,
    });
    if (result instanceof Error) {
      throw new Error(result.message);
    }
    return res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: result.userId,
          fullName: result.fullName,
          username: result.username,
        },
      },
    });
  } catch (error: any) {
    return res.status(400).json({
      status: 'fail',
      errors: [
        {
          code: 400,
          message: error.message,
        },
      ],
    });
  }
}

export async function getUserProfileHandler(
  req: Request,
  res: Response<GeneralResponse>,
) {
  const userProfileId = parseInt(req.params.userProfileId, 10);
  try {
    const user = await getUserProfile({ userProfileId });
    if (user instanceof Error) {
      throw new Error(user.message);
    }
    const mappedHobby = mappingUserHobby(user.UserHobby);

    return res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          username: user.username,
          fullName: user.fullName,
          bio: user.bio,
          sosmed: user.sosmed,
          hobbies: mappedHobby.hobby,
        },
      },
    });
  } catch (error: any) {
    return res.status(404).json({
      status: 'fail',
      errors: [{ code: 404, message: error.message }],
    });
  }
}
