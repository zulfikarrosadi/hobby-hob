import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createBlog(blog: {
  title: string;
  content: string;
  userProfileId: number;
  hobbyId: number;
}) {
  const result = await prisma.blog.create({
    data: {
      title: blog.title,
      content: blog.content,
      userId: blog.userProfileId,
      hobbyId: blog.hobbyId,
    },
    select: {
      id: true,
    },
  });
  return result;
}

export async function getBlogsInHobby(hobby: { id: number }) {
  const result = await prisma.hobby.findFirst({
    where: { id: hobby.id },
    select: {
      id: true,
      Blog: {
        take: 50,
        select: {
          id: true,
          title: true,
          content: true,
          User: { select: { id: true, username: true } },
        },
      },
    },
  });

  return result;
}
