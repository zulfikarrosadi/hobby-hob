import { PrismaClient, Prisma, UserProfile } from '@prisma/client';

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
  sosmed,
}: {
  userId: number;
  username: string;
  fullName: string;
  bio: string;
  sosmed: {
    instagram?: string;
    tiktok?: string;
    linkedin?: string;
    website?: string;
    others?: string[];
  };
}): Promise<{ username: string; fullName: string }> {
  const result = await prisma.userProfile.update({
    data: {
      fullName,
      username,
      bio,
      sosmed,
      UserId: { connect: { id: userId } },
    },
    where: { userId },
  });

  return result;
}

export async function updateUserProfile({ bio }: { bio: string }) {}

export async function getUserProfile({
  userProfileId,
}: {
  userProfileId: number;
}): Promise<{
  id: number;
  username: string;
  fullName: string;
  bio: string;
  sosmed: Prisma.JsonValue;
  UserHobby: {
    userId: number;
    hobbyId: number;
    hobby: { id: number; name: string };
  }[];
}> {
  const result = await prisma.userProfile.findFirst({
    where: { id: userProfileId },
    include: {
      UserHobby: { include: { hobby: { select: { id: true, name: true } } } },
    },
  });

  return result;
}
