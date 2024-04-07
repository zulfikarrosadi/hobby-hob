import { object, string, TypeOf } from 'zod';

export const loginInputSchema = object({
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .transform((val) => val.toLowerCase()),
  password: string({ required_error: 'Password is required' }).min(
    1,
    'Password is required',
  ),
});

export type TLoginInput = TypeOf<typeof loginInputSchema>;
