import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}): Promise<{
  email: string;
  id: number;
  UserProfile: { username: string; id: number }[];
}> {
  const user = await prisma.user.create({
    data: { email, password, UserProfile: { create: { username } } },
    select: {
      email: true,
      id: true,
      UserProfile: {
        select: { username: true, id: true },
        where: { username },
      },
    },
  });
  return user;
}

export async function createUserProfile({
  userId,
  username,
  fullName,
  bio,
}: {
  userId: number;
  username: string;
  fullName: string;
  bio: string;
}): Promise<{ username: string; fullName: string }> {
  const result = prisma.userProfile.create({
    data: { fullName, username, bio, UserId: { connect: { id: userId } } },
  });

  return result;
}

export async function updateUserProfile({ bio }: { bio: string }) {}
