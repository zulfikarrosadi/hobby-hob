import { Request, Response } from 'express';
import { TCreateUserHobbyInput } from '../schemas/hobby.schema';
import {
  connectHobbiesToUser,
  findHobbyByName,
  getHobbies,
  getInfiniteHobbies,
  getInfiniteHobbyAndUser,
  getUserAndHobby,
} from '../services/hobby.service';
import { mapUserHoobiesInput } from '../utils/hobbyHelper';
import GeneralResponse from '../schemas/responses.schema';

export async function getHobbiesHandler(
  req: Request<{}, {}, {}, { hobbyName: string }>,
  res: Response<GeneralResponse>,
) {
  const { hobbyName } = req.query;

  try {
    if (hobbyName) {
      const hobbies = await findHobbyByName({ hobbyName });
      if (hobbies instanceof Error) {
        throw new Error('hobby not found');
      }
      return res.status(200).json({
        status: 'success',
        data: { hobbies },
      });
    }
    const hobbies = await getHobbies();
    const finalData = hobbies.map((hobby) => {
      return {
        id: hobby.id,
        name: hobby.name,
        description: hobby.description,
        image: hobby.image,
        isJoined: hobby.UserHobby.map((user) => {
          return {
            id: user.user.id,
            username: user.user.username,
          };
        }).reduce((_, curr) => {
          return curr.id === res.locals.user.userProfileId;
        }, false),
        users: hobby.UserHobby.map((user) => {
          return {
            id: user.user.id,
            username: user.user.username,
          };
        }).filter((user) => {
          return user.id !== res.locals.user.userProfileId;
        }),
      };
    });

    return res.status(200).json({
      status: 'success',
      data: { cursor: hobbies[hobbies.length - 1].id, hobbies: finalData },
    });
  } catch (error) {
    console.log('catching error', error);
    return res.status(404).json({
      status: 'fail',
      errors: { code: 404, message: 'hobby not found' },
    });
  }
}

export async function addHobbyToUserHandler(
  req: Request<{}, {}, Required<TCreateUserHobbyInput>>,
  res: Response<GeneralResponse>,
) {
  try {
    const userIdAndHoobyId = mapUserHoobiesInput({
      userId: res.locals.user.userProfileId,
      hobbyIds: req.body.hobbyId,
    });

    const result = await connectHobbiesToUser(userIdAndHoobyId);
    if (result.count < 1) {
      throw new Error('maybe you already join this hobby community');
    }
    return res.status(201).json({ status: 'success' });
  } catch (error: any) {
    console.log(error);
    return res
      .status(400)
      .json({ status: 'fail', errors: { code: 400, message: error.message } });
  }
}

export async function getInfiniteHobbiesHandler(
  req: Request<{ cursor: string }>,
  res: Response<GeneralResponse>,
) {
  const { cursor } = req.params;
  const hobbyId = parseInt(cursor, 10);

  try {
    const hobbies = await getInfiniteHobbies({ id: hobbyId });
    if (!hobbies.length) {
      throw new Error(
        "Currently there're no more hobbies can be found. I guess, that's the end of it",
      );
    }

    return res.status(200).json({
      status: 'success',
      data: {
        cursor: hobbies[hobbies.length - 1].id,
        hobbies,
      },
    });
  } catch (error: any) {
    console.log(error);
    return res.status(404).json({
      status: 'fail',
      errors: {
        code: 404,
        message: error.message,
      },
    });
  }
}

export async function getInfiniteHobbyAndUserHandler(
  req: Request<{ hobbyId: string; userProfileId: string }>,
  res: Response<GeneralResponse>,
) {
  const hobbyId = parseInt(req.params.hobbyId, 10);
  const userProfileId = parseInt(req.params.userProfileId, 10);

  try {
    const result = await getInfiniteHobbyAndUser({ hobbyId, userProfileId });

    if (result instanceof Error) {
      throw new Error(result.message);
    }

    return res.status(200).json({
      status: 'success',
      data: {
        cursor: {
          hobbyId: result.hobbyId,
          userProfileId: result.users[result.users.length - 1].id,
        },
        users: result.users,
      },
    });
  } catch (error: any) {
    console.log(error);
    return res
      .status(404)
      .json({ status: 'fail', errors: { code: 404, message: error.message } });
  }
}

export async function getHobbyAndUserHandler(
  req: Request,
  res: Response<GeneralResponse>,
) {
  const hobbyId = parseInt(req.params.hobbyId, 10);
  try {
    const result = await getUserAndHobby({ id: hobbyId });
    if (result instanceof Error) {
      throw new Error(result.message);
    }

    return res.status(200).json({
      status: 'success',
      data: {
        cursor: {
          userProfileId: result.users[result.users.length - 1].id,
        },
        hobby: {
          id: result.hobbyId,
          name: result.hobbyName,
          description: result.hobbyDescription,
          image: result.hobbyImage,
        },
        users: result.users,
      },
    });
  } catch (error: any) {
    console.log(error);

    return res
      .status(404)
      .json({ status: 'fail', errors: { code: 404, message: error.message } });
  }
}
