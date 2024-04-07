import { array, number, object, TypeOf } from 'zod';

export const createUserHobbyInputSchema = object({
  hobbyId: array(
    number({ required_error: 'You must choose at least one hobby' }),
  ),
});
export type TCreateUserHobbyInput = TypeOf<typeof createUserHobbyInputSchema>;
