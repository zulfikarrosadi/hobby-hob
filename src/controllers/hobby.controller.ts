import { Request, Response } from 'express';
import { TCreateUserHobbyInput } from '../schemas/hobby.schema';
import { connectHobbiesToUser, getHobbies } from '../services/hobby.service';
import mapUserHoobiesInput from '../utils/mappingChosenHobby';

export async function getHobbiesHandler(req: Request, res: Response) {
  try {
    const hobbies = await getHobbies();

    return res.status(200).json(hobbies);
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
