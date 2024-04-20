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

export async function getHobbies(): Promise<
  {
    id: number;
    name: string;
    description: string | null;
    image: string;
    UserHobby: {
      user: {
        id: number;
        username: string;
      };
    }[];
  }[]
> {
  const result = await prisma.hobby.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
      UserHobby: { select: { user: { select: { id: true, username: true } } } },
    },
    take: 50,
  });

  return result;
}

export async function getInfiniteHobbies({
  id,
}: {
  id: number;
}): Promise<{ id: number; name: string }[]> {
  const result = await prisma.hobby.findMany({
    cursor: { id },
    take: 50,
    skip: 1,
    select: { id: true, name: true, description: true, image: true },
  });

  return result;
}

export async function findHobbyByName({
  hobbyName,
}: {
  hobbyName: string;
}): Promise<
  | { id: number; name: string; description: string | null; image: string }
  | Error
> {
  try {
    const result = await prisma.hobby.findFirst({
      where: { name: { contains: hobbyName } },
      select: { id: true, name: true, description: true, image: true },
    });
    if (!result) {
      throw new Error('hobby not found');
    }
    return {
      id: result.id,
      name: result.name,
      description: result.description,
      image: result.image,
    };
  } catch (error: any) {
    return new Error(error.message);
  }
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
        select: {
          user: { select: { id: true, username: true, sosmed: true } },
        },
        take: 50,
      },
    },
  });

  return result;
}

export async function getInfiniteHobbyAndUser({
  userProfileId,
  hobbyId,
}: {
  userProfileId: number;
  hobbyId: number;
}) {
  const result = await prisma.hobby.findFirst({
    where: { id: hobbyId },
    include: {
      UserHobby: {
        select: {
          user: {
            select: {
              id: true,
              username: true,
              sosmed: true,
              bio: true,
              fullName: true,
            },
          },
        },
        cursor: { userId_hobbyId: { userId: userProfileId, hobbyId } },
        skip: 1,
        take: 50,
        orderBy: { userId: 'asc' },
      },
    },
  });

  if (!result || result.UserHobby.length < 1) {
    return new Error("that's the end of it");
  }

  return {
    hobbyName: result.name,
    hobbyId: result.id,
    users: result.UserHobby.map((user) => ({
      username: user.user.username,
      id: user.user.id,
      bio: user.user.bio ?? '',
      fullName: user.user.fullName ?? '',
      sosmed: {
        instagram: user.user.sosmed?.instagram ?? '',
        linkedin: user.user.sosmed?.linkedin ?? '',
        tiktok: user.user.sosmed?.tiktok ?? '',
        website: user.user.sosmed?.website ?? '',
      },
    })),
  };
}

export async function getUserAndHobby(data: { id: number }) {
  const result = await prisma.hobby.findFirst({
    where: { id: data.id },
    include: {
      UserHobby: {
        select: {
          user: {
            select: {
              username: true,
              id: true,
              bio: true,
              fullName: true,
              sosmed: true,
            },
          },
        },
        take: 50,
        orderBy: { userId: 'asc' },
      },
    },
  });
  if (!result || result?.UserHobby.length < 1) {
    return new Error(
      "mmmm... i guess there's no people that have this hobby yet",
    );
  }

  return {
    hobbyId: result.id,
    hobbyName: result.name,
    hobbyDescription: result.description,
    hobbyImage: result.image,
    users: result.UserHobby.map((user) => ({
      username: user.user.username,
      id: user.user.id,
      bio: user.user.bio,
      fullName: user.user.fullName ?? '',
      sosmed: {
        instagram: user.user.sosmed?.instagram ?? '',
        linkedin: user.user.sosmed?.linkedin ?? '',
        tiktok: user.user.sosmed?.tiktok ?? '',
        website: user.user.sosmed?.website ?? '',
      },
    })),
  };
}
