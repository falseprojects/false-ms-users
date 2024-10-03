import { FastifyInstance } from 'fastify';
import { getUserByEmail } from './user/getUserByEmail';
import { createUser } from './user/createUser';
import { updateUser } from './user/updateUser';
import { deleteUser } from './user/deleteUser';
import { getAllUsers } from './user/getAllUsers';

export async function routes(app: FastifyInstance) {
  await getAllUsers(app);
  await getUserByEmail(app);
  await createUser(app);
  await updateUser(app);
  await deleteUser(app);
}
