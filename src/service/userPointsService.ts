import { prisma } from '@/lib/prisma';
import { BadRequestError } from '@/routes/errors/badRequestError';

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

export async function getCurrentPoints(user_points_id: number) {
  return await prisma.usersPoints.findUnique({
    where: {
      user_points_id,
    },
  });
}

export async function updatePointsService(
  user_id: number,
  user_points_id: number,
  point_amount: number,
  operation: string
) {
  const currentPoints = await getCurrentPoints(user_points_id);

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
      user_points_id,
    },
    data: {
      point_amount,
    },
  });
}
