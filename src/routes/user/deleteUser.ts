import { deleteUserService } from '@/service/userService';
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

export async function deleteUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete('/user/delete', {
    schema: {
      tags: ['users'],
      summary: 'Delete an existing user',
      response: {
        200: z.object({
          message: z.string(),
        }),
      },
    },
    handler: async (request, reply) => {
      const { user_id } = await request.getCurrentUser();

      //TODO: Transaction Delete (user-wishlist/points etc)
      await deleteUserService(user_id);

      return reply.status(200).send({ message: 'User deleted successfully' });
    },
  });
}
