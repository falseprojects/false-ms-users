import { createUserService } from '@/service/userService';
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';

export async function createUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/user/create', {
    schema: {
      tags: ['users'],
      summary: 'Create a new user',
      body: z.object({
        email: z.string().email(),
        password_hash: z
          .string()
          .min(8, 'Password must be at least 8 characters'),
      }),
      response: {
        201: z.object({
          user_id: z.number(),
          email: z.string(),
          user_wishlist_id: z.number().nullable(),
          created_at: z.date(),
          updated_at: z.date(),
        }),
      },
    },
    handler: async (request, reply) => {
      const { email, password_hash } = request.body;

      const newUser = await createUserService(email, password_hash);

      return reply.status(201).send(newUser);
    },
  });
}
