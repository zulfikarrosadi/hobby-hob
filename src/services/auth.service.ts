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
