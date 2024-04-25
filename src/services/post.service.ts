import { Post, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function savePost(post: {
  content: string;
  userProfileId: number;
  hobbyId: number;
}) {
  const result = await prisma.post.create({
    data: {
      content: post.content,
      userId: post.userProfileId,
      hobbyId: post.hobbyId,
    },
    select: {
      id: true,
    },
  });
  return result;
}

export async function getPostsInHobby(hobby: { id: number }) {
  const result = await prisma.hobby.findFirst({
    where: { id: hobby.id },
    select: {
      id: true,
      Post: {
        take: 50,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          content: true,
          User: { select: { id: true, username: true } },
        },
      },
    },
  });

  return result;
}

export async function updatePostById(data: {
  Post: Omit<Post, 'userId'>;
  userProfileId: number;
}) {
  const result = await prisma.post.update({
    where: { id: data.Post.id, AND: { userId: data.userProfileId } },
    data: { content: data.Post.content },
  });

  return result;
}

export async function deletePostById(data: {
  PostId: number;
  userProfileId: number;
}) {
  const result = await prisma.post.delete({
    where: { id: data.PostId, AND: { userId: data.userProfileId } },
  });

  return result;
}
