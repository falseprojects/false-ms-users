import { prisma } from '../lib/prisma';
import { BadRequestError } from '../routes/errors/badRequestError';
import { createPointsService } from './userPointsService';

export async function createUserService(email: string, password_hash: string) {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new BadRequestError('User already exists');
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      password_hash,
    },
  });

  await createPointsService(newUser.user_id, 0);

  return newUser;
}

export async function deleteUserService(user_id: number) {
  const existingUser = await findUserById(user_id);

  if (!existingUser) {
    throw new BadRequestError('User not found');
  }

  await prisma.user.delete({
    where: { user_id },
  });
}

export async function updateUserVerifiedEmail(email: string) {
  const updatedUser = await prisma.user.update({
    where: { email },
    data: {
      verified_email: 'T',
    },
  });

  return updatedUser;
}
export async function updateUserService(
  user_id: number,
  email: string,
  password_hash: string
) {
  const existingUser = await findUserById(user_id);

  if (!existingUser) {
    throw new BadRequestError('User not found');
  }

  if (email && email !== existingUser.email) {
    const emailConflict = await findUserByEmail(email);

    if (emailConflict) {
      throw new BadRequestError('Email already in use by another user');
    }
  }

  const updatedUser = await prisma.user.update({
    where: { user_id },
    data: {
      email: email ?? existingUser.email,
      password_hash: password_hash ?? existingUser.password_hash,
    },
  });

  return updatedUser;
}

export async function findUserByEmail(email: string) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  return existingUser;
}

export async function findUserById(user_id: number) {
  const existingUser = await prisma.user.findUnique({
    where: { user_id },
  });
  return existingUser;
}
