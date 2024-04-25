import { z } from 'zod';

export const createPostSchema = z.object({
  content: z
    .string({ required_error: 'content is required' })
    .min(1, 'content is required'),
  hobbyId: z.number({ required_error: 'hobbyId is required' }),
});

export const updatePostSchema = z.object({
  content: z
    .string({ required_error: 'content is required' })
    .min(1, 'content is required'),
  hobbyId: z.number({ required_error: 'hobbyId is required' }),
});

export type PostSchema = z.TypeOf<typeof createPostSchema>;
export type UpdatePostSchema = z.TypeOf<typeof updatePostSchema>;
