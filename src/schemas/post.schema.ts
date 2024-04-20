import { z } from 'zod';

export const createPostSchema = z.object({
  content: z
    .string({ required_error: 'content is required' })
    .min(1, 'content is required'),
  hobbyId: z.string({ required_error: 'hobbyId is required' }),
});

export type PostSchema = z.TypeOf<typeof createPostSchema>;
