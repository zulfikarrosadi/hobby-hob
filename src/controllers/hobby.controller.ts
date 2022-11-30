import { Request, Response } from 'express';
import { TCreateUserHobbyInput } from '../schemas/hobby.schema';
import {
  connectHobbiesToUser,
  getHobbies,
  getInfiniteHobbies,
  getInfiniteHobbyAndUser,
  getUserAndHobby,
} from '../services/hobby.service';
import mapUserHoobiesInput from '../utils/mappingChosenHobby';
import { mappingUserHobbyResult } from '../utils/mappingUserInHobbyResult';

export async function getHobbiesHandler(req: Request, res: Response) {
  try {
    const hobbies = await getHobbies();

    return res.status(200).json({ message: 'success', hobbies });
  } catch (error) {
    return res.status(404).json({ message: 'hobby not found' });
  }
}

export async function addHobbyToUserHandler(
  req: Request<{}, {}, Required<TCreateUserHobbyInput['body']>>,
  res: Response,
) {
  try {
    const data = mapUserHoobiesInput({
      userId: res.locals.user.userProfileId,
      hobbyIds: req.body.hobbyId,
    });

    await connectHobbiesToUser(data);

    return res.status(201).json({ message: 'success' });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

export async function getInfiniteHobbiesHandler(
  req: Request<{ cursor: string }>,
  res: Response,
) {
  const { cursor } = req.params;

  try {
    const hobbies = await getInfiniteHobbies({ name: cursor });

    return res.status(200).json({ message: 'success', hobbies });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'hobby not found' });
  }
}

export async function getInfiniteHobbyAndUserHandler(
  req: Request<{ hobbyName: string; hobbyId: string; userProfileId: string }>,
  res: Response,
) {
  const { hobbyName } = req.params;
  const hobbyId = parseInt(req.params.hobbyId, 10);
  const userProfileId = parseInt(req.params.userProfileId, 10);

  try {
    const rawData = await getInfiniteHobbyAndUser({
      hobbyId,
      hobbyName,
      userProfileId,
    });

    const result = mappingUserHobbyResult(rawData);

    return res.status(200).json({ message: 'success', data: result });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'User not found' });
  }
}

export async function getHobbyAndUserHandler(req: Request, res: Response) {
  const { hobbyName } = req.params;
  try {
    const rawData = await getUserAndHobby({ hobbyName });

    const result = mappingUserHobbyResult(rawData);

    return res.status(200).json({ message: 'success', data: result });
  } catch (error) {
    console.log(error);

    return res.status(400).json({ message: 'user not found' });
  }
}
