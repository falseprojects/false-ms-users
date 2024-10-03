import { prisma } from '@/lib/prisma';

export async function createUserService(email: string, password_hash: string) {
  const newUser = await prisma.user.create({
    data: {
      email,
      password_hash,
    },
  });
  return newUser;
}
