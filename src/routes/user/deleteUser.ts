import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { prisma } from '@/lib/prisma';
import { BadRequestError } from '../errors/badRequestError';

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
      // await request.getCurrentUser();

      const { userId } = request.params;
      const id = parseInt(userId);

      const existingUser = await prisma.user.findUnique({
        where: { user_id: id },
      });

      if (!existingUser) {
        throw new BadRequestError('User not found');
      }

      await prisma.user.delete({
        where: { user_id: id },
      });

      return reply.status(200).send({ message: 'User deleted successfully' });
    },
  });
}
