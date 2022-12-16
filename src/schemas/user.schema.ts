import { array, object, string, TypeOf } from 'zod';

export const createUserInputSchema = object({
  body: object({
    email: string({ required_error: 'Email is required' })
      .email('Your email format is invalid')
      .transform((val) => val.toLowerCase()),
    password: string({ required_error: 'Password is required' }).min(
      6,
      'Password should have minimun 6 characters ',
    ),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),
  }).refine((body) => body.password === body.passwordConfirmation, {
    path: ['body.password', 'body.passwordConfirmation'],
    message: 'Your password is not match',
  }),
});

export const createUserProfileInputSchema = object({
  body: object({
    username: string({ required_error: 'Username is required' }).min(
      6,
      'Username should contain at least 6 characters',
    ),
    fullName: string({ required_error: 'You should enter your fullname' }),
    bio: string({
      required_error:
        'You should give a short description about you and your hobby',
    }),
    sosmed: object({
      instagram: string().optional(),
      tiktok: string().optional(),
      linkedin: string().optional(),
      website: string().optional(),
      others: array(string()).optional(),
    }).optional(),
  }),
});

export type TCreateUserInput = TypeOf<typeof createUserInputSchema>;
export type TCreateUserProfileIntput = TypeOf<
  typeof createUserProfileInputSchema
>;
