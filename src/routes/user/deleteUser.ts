import { deleteUserService } from '@/service/userService';
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

export async function deleteUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete('/user/delete/:userId', {
    schema: {
      tags: ['users'],
      summary: 'Delete an existing user',
      params: z.object({
        userId: z.string(),
      }),
      response: {
        200: z.object({
          message: z.string(),
        }),
      },
    },
    handler: async (request, reply) => {
      await request.getCurrentUser();

      const { userId } = request.params;
      const id = parseInt(userId);

      //ToDo: Transaction delete (user-wishlist/points etc)
      await deleteUserService(id);

      return reply.status(200).send({ message: 'User deleted successfully' });
    },
  });
}
