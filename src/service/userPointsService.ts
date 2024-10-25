import { prisma } from '../lib/prisma';
import { BadRequestError } from '../routes/errors/badRequestError';

export async function createPointsService(
  user_id: number,
  point_amount: number
) {
  return await prisma.usersPoints.create({
    data: {
      user_id,
      point_amount,
    },
  });
}

export async function getCurrentPoints(user_id: number) {
  return await prisma.usersPoints.findUnique({
    where: {
      user_id,
    },
  });
}

export async function updatePointsService(
  user_id: number,
  point_amount: number,
  operation: string
) {
  const currentPoints = await getCurrentPoints(user_id);

  if (!currentPoints) {
    throw new BadRequestError('User points not found');
  }

  if (operation === 'increase') {
    point_amount = currentPoints.point_amount + point_amount;
  } else if (operation === 'decrease') {
    point_amount = currentPoints.point_amount - point_amount;
    if (point_amount < 0) {
      point_amount = 0;
    }
  } else {
    throw new BadRequestError('Invalid operation');
  }

  return await prisma.usersPoints.update({
    where: {
      user_id,
    },
    data: {
      point_amount,
    },
  });
}
