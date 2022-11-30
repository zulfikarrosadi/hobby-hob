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
    orderBy: { name: 'asc' },
    take: 50,
  });

  return result;
}

export async function getInfiniteHobbies({
  name,
}: {
  name: string;
}): Promise<{ id: number; name: string }[]> {
  const result = await prisma.hobby.findMany({
    cursor: { name },
    take: 50,
    skip: 1,
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  });

  return result;
}

export async function findHobbyByName({
  hobbyName,
}: {
  hobbyName: string;
}): Promise<{ id: number; name: string }> {
  const result = await prisma.hobby.findFirst({
    where: { name: { contains: hobbyName } },
    select: { id: true, name: true },
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
      UserHobby: {
        select: { user: { select: { id: true, username: true } } },
        take: 50,
      },
    },
  });

  return result;
}

export async function getInfiniteHobbyAndUser({
  hobbyName,
  userProfileId,
  hobbyId,
}: {
  hobbyName: string;
  userProfileId: number;
  hobbyId: number;
}) {
  const result = await prisma.hobby.findFirst({
    where: { name: hobbyName },
    include: {
      UserHobby: {
        select: { user: { select: { username: true, id: true } } },
        cursor: { userId_hobbyId: { userId: userProfileId, hobbyId } },
        skip: 1,
        take: 50,
        orderBy: { userId: 'asc' },
      },
    },
  });

  return result;
}

export async function getUserAndHobby(data: { hobbyName: string }) {
  const result = await prisma.hobby.findFirst({
    where: { name: data.hobbyName },
    include: {
      UserHobby: {
        select: { user: { select: { username: true, id: true } } },
        take: 50,
        orderBy: { userId: 'asc' },
      },
    },
  });

  return result;
}
