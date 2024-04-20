import { PrismaClient } from '@prisma/client';
import { TLoginInput } from '../schemas/auth.schema';

const prisma = new PrismaClient();

export async function findUserByEmail({
  email,
}: Pick<TLoginInput['body'], 'email'>) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      password: true,
      UserProfile: { select: { id: true, username: true } },
    },
  });

  return user;
}

export async function saveTokenToDb(token: string, userId: number) {
  try {
    const res = await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: token },
      select: {
        id: true,
        email: true,
        UserProfile: { select: { username: true, id: true } },
      },
    });
    return res;
  } catch (error) {
    console.log('save_token_to_db', error);
    return Promise.reject(error);
  }
}
