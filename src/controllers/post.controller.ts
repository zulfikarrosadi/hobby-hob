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
      hobbyId: req.body.hobbyId,
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

export async function updatePost(
  req: Request<{ postId: string }, {}, UpdatePostSchema>,
  res: Response<
    ApiResponse,
    { user: { userProfileId: number; userId: number } }
  >,
) {
  const { hobbyId, content } = req.body;

  try {
    const updatedPost = await updatePostById({
      Post: {
        id: parseInt(req.params.postId, 10),
        content: content,
        hobbyId: hobbyId,
      },
      userProfileId: res.locals.user.userProfileId,
    });

    return res.status(200).json({
      status: 'success',
      data: {
        post: {
          id: updatedPost.id,
          content: updatedPost.content,
          hobbyId: updatedPost.hobbyId,
        },
      },
    });
  } catch (error) {
    console.log('update_post_handler', error);
    return res.status(400).json({
      status: 'success',
      errors: {
        code: 400,
        message:
          'failed to update post, please try again and make sure you enter the correct data',
      },
    });
  }
}

export async function deletePost(
  req: Request<{ postId: string }>,
  res: Response<
    ApiResponse,
    { user: { userId: number; userProfileId: number } }
  >,
) {
  try {
    const deletedPost = await deletePostById({
      PostId: parseInt(req.params.postId),
      userProfileId: res.locals.user.userProfileId,
    });
    console.log(deletedPost);

    return res.sendStatus(204);
  } catch (error) {
    console.log('delete_post_handler', error);
    return res.status(400).json({
      status: 'fail',
      errors: { code: 400, message: 'failed to delete post, please try again' },
    });
  }
}
