import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { prisma } from '@/lib/prisma';
import z from 'zod';

export async function getAllUsers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/user/getAll', {
    schema: {
      tags: ['users'],
      summary: 'Get all users',
      response: {
        200: z.array(
          z.object({
            user_id: z.number(),
            email: z.string(),
            password_hash: z.string(),
            user_wishlist_id: z.number().nullable(),
            created_at: z.date(),
            updated_at: z.date(),
          })
        ),
      },
    },
    handler: async (request, reply) => {
      // await request.getCurrentUser();

      const users = await prisma.user.findMany();
      return reply.status(200).send(users);
    },
  });
}
