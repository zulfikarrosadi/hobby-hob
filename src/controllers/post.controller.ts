import { Request, Response } from 'express';
import {
  deletePostById,
  getPostsInHobby,
  savePost,
  updatePostById,
} from '../services/post.service';
import { PostSchema, UpdatePostSchema } from '../schemas/post.schema';
import ApiResponse from '../schemas/responses.schema';

export async function getPosts(
  req: Request<{ hobbyId: string }>,
  res: Response<ApiResponse>,
) {
  const posts = await getPostsInHobby({ id: parseInt(req.params.hobbyId, 10) });

  return res.status(200).json({
    status: 'success',
    data: {
      posts: posts?.Post.map((post) => {
        return {
          id: post.id,
          content: post.content,
          user: {
            id: post.User.id,
            username: post.User.username,
          },
        };
      }),
    },
  });
}

export async function createPost(
  req: Request<{}, {}, PostSchema>,
  res: Response<ApiResponse>,
) {
  try {
    const post = await savePost({
      content: req.body.content,
      hobbyId: parseInt(req.body.hobbyId, 10),
      userProfileId: res.locals.user.userProfileId,
    });
    return res.status(200).json({
      status: 'success',
      data: {
        post: {
          id: post.id,
        },
      },
    });
  } catch (error: any) {
    console.log(error);
    return res.status(200).json({
      status: 'fail',
      errors: { code: 400, message: error.message },
    });
  }
}
