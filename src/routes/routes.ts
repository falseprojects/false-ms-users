import { FastifyInstance } from 'fastify';
import { getAllUsers } from './getAllUsers';
import { getUserByEmail } from './getUserByEmail';
import { createUser } from './createUser';
import { updateUser } from './updateUser';

export async function routes(app: FastifyInstance) {
  await getAllUsers(app);
  await getUserByEmail(app);
  await createUser(app);
  await updateUser(app);
}
