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
}): Promise<
  | {
      email: string;
      id: number;
      UserProfile: { username: string; id: number }[];
    }
  | Error
> {
  try {
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
  } catch (error: any) {
    console.log(error);
    if (error.code === 'P2002') {
      return new Error(
        'The email address you entered is already in use. Please try a different email address',
      );
    }
    return new Error('cannot create user, please try again');
  }
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
}): Promise<{ username: string; fullName: string; userId: number } | Error> {
  try {
    const result = await prisma.userProfile.update({
      data: {
        fullName,
        username,
        bio,
        sosmed,
        UserId: { connect: { id: userId } },
      },
      select: { userId: true, username: true, fullName: true },
      where: { userId },
    });

    return {
      fullName: result.fullName ?? '',
      userId: result.userId,
      username: result.username,
    };
  } catch (error: any) {
    console.log(error);
    return new Error("there's something wrong, please try again");
  }
}

export async function updateUserProfile({ bio }: { bio: string }) {}

export async function getUserProfile({
  userProfileId,
}: {
  userProfileId: number;
}): Promise<
  | {
      id: number;
      username: string;
      fullName: string;
      bio: string;
      sosmed: Prisma.JsonValue;
      UserHobby: {
        userId: number;
        hobbyId: number;
        hobby: {
          id: number;
          name: string;
          image: string;
          description: string | null;
        };
      }[];
    }
  | Error
> {
  try {
    const result = await prisma.userProfile.findFirst({
      where: { id: userProfileId },
      include: {
        UserHobby: {
          include: {
            hobby: {
              select: { id: true, name: true, image: true, description: true },
            },
          },
        },
      },
    });
    if (result instanceof Error || !result) {
      console.log(result);
      throw new Error('users not found, please try again');
    }
    return {
      id: result.id,
      username: result.username,
      fullName: result.fullName ?? '',
      bio: result.bio ?? '',
      UserHobby: result.UserHobby,
      sosmed: result.sosmed,
    };
  } catch (error: any) {
    console.log(error);
    return error;
  }
}
