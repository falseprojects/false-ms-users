import { prisma } from '@/lib/prisma';
import { BadRequestError } from '@/routes/errors/badRequestError';

export async function createWishlistService(
  wishlist_name: string,
  user_id: number,
  products_ids: number[]
) {
  const existingUser = await prisma.user.findUnique({
    where: { user_id },
  });

  if (!existingUser) {
    throw new BadRequestError('User not found');
  }

  const newWishlist = await prisma.userWishlist.create({
    data: {
      wishlist_name,
      user_id,
      products_ids,
    },
  });
  return newWishlist;
}

export async function updateWishlistService(
  user_wishlist_id: number,
  wishlist_name: string,
  products_ids: number[]
) {
  return await prisma.userWishlist.update({
    where: { user_wishlist_id },
    data: {
      wishlist_name,
      products_ids,
    },
  });
}

export async function deleteWishlistService(user_wishlist_id: number) {
  return await prisma.userWishlist.delete({
    where: { user_wishlist_id },
  });
}

export async function getWishlistByUserService(user_id: number) {
  return await prisma.userWishlist.findMany({
    where: { user_id },
  });
}
