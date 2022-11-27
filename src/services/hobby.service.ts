import { Hobby, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type THobbyUser = Hobby & {
  UserHobby: { user: { id: number; username: string } }[];
};

export async function connectHobbiesToUser(
  data: { userId: number; hobbyId: number }[],
) {
  const result = await prisma.userHobby.createMany({
    data,
    skipDuplicates: true,
  });

  return result;
}

export async function getHobbies(): Promise<{ id: number; name: string }[]> {
  const result = await prisma.hobby.findMany({
    select: { id: true, name: true },
  });

  return result;
}

export async function getHobby({
  name,
}: {
  name: string;
}): Promise<{ id: number; name: string }> {
  const result = await prisma.hobby.findFirst({
    where: { name },
  });

  return result;
}

export async function getHobbyAndUser({
  hobbyName,
}: {
  hobbyName: string;
}): Promise<THobbyUser> {
  const result = await prisma.hobby.findFirst({
    where: { name: hobbyName },
    include: {
      UserHobby: { select: { user: { select: { id: true, username: true } } } },
    },
  });

  return result;
}
