import { FastifyInstance } from 'fastify';
import { getUserByEmail } from '@/routes/user/getUserByEmail';
import { createUser } from '@/routes/user/createUser';
import { updateUser } from '@/routes/user/updateUser';
import { deleteUser } from '@/routes/user/deleteUser';
import { getAllUsers } from '@/routes/user/getAllUsers';
import { createWishlist } from '@/routes/user-wishlist/createWishlist';
import { isEmailVerified } from '@/routes/user/isEmailVerified';
import { updateVerifiedEmail } from '@/routes/user/updateVerifiedEmail';
import { updatePoints } from '@/routes/user-points/updatePoints';
import { createProfile } from '@/routes/user-profiles/createProfile';
import { getProfileByUser } from '@/routes/user-profiles/getProfileByUser';
import { updateProfile } from '@/routes/user-profiles/updateProfile';
import { deleteWishlist } from '@/routes/user-wishlist/deleteWishlist';
import { getWishlistByUser } from '@/routes/user-wishlist/getWishlistByUser';
import { updateWishlist } from '@/routes/user-wishlist/updateWishlist';

export async function routes(app: FastifyInstance) {
  await getAllUsers(app);
  await getUserByEmail(app);
  await createUser(app);
  await updateUser(app);
  await deleteUser(app);
  await isEmailVerified(app);
  await updateVerifiedEmail(app);
  await updatePoints(app);
  await createProfile(app);
  await getProfileByUser(app);
  await updateProfile(app);
  await createWishlist(app);
  await deleteWishlist(app);
  await getWishlistByUser(app);
  await updateWishlist(app);
}
