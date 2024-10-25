import { FastifyInstance } from 'fastify';
import { getWishlistsByUser } from './user-wishlist/getWishlistsByUser';
import { createUser } from './user/createUser';
import { deleteUser } from './user/deleteUser';
import { getAllUsers } from './user/getAllUsers';
import { getUserByEmail } from './user/getUserByEmail';
import { updateUser } from './user/updateUser';
import { isEmailVerified } from './user/isEmailVerified';
import { updateVerifiedEmail } from './user/updateVerifiedEmail';
import { updatePoints } from './user-points/updatePoints';
import { createProfile } from './user-profiles/createProfile';
import { getProfileByUser } from './user-profiles/getProfileByUser';
import { updateProfile } from './user-profiles/updateProfile';
import { createWishlist } from './user-wishlist/createWishlist';
import { deleteWishlist } from './user-wishlist/deleteWishlist';
import { updateWishlist } from './user-wishlist/updateWishlist';

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
  await getWishlistsByUser(app);
  await updateWishlist(app);
}
