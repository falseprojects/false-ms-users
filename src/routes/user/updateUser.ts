import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { updateUserService } from '../../service/userService';

export async function updateUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put('/user/update', {
    schema: {
      tags: ['users'],
      summary: 'Update an existing user',
      body: z.object({
        email: z.string().email(),
        password_hash: z
          .string()
          .min(8, 'Password must be at least 8 characters'),
      }),
      response: {
        200: z.object({
          user_id: z.number(),
          email: z.string(),
          created_at: z.date(),
          updated_at: z.date(),
        }),
      },
    },
    handler: async (request, reply) => {
      const { user_id } = await request.getCurrentUser();

      const { email, password_hash } = request.body;

      const updatedUser = await updateUserService(
        user_id,
        email,
        password_hash
      );

      return reply.status(200).send(updatedUser);
    },
  });
}
