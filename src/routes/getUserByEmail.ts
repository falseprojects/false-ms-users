import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { prisma } from '../lib/prisma';
import z from 'zod';
import { BadRequestError } from './errors/badRequestError';

export async function getUserByEmail(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/user/getByEmail', {
    schema: {
      tags: ['users'],
      summary: 'Get user by email',
      body: z.object({
        email: z.string().email(),
      }),
      response: {
        200: z.object({
          user_id: z.number(),
          email: z.string(),
          password_hash: z.string(),
          user_wishlist_id: z.number().nullable(),
          created_at: z.date(),
          updated_at: z.date(),
        }),
      },
    },
    handler: async (request, reply) => {
      await request.getCurrentUser();

      const { email } = request.body;
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new BadRequestError('User not found');
      }

      return reply.status(200).send(user);
    },
  });
}
