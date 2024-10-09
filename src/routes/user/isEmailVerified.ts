import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { findUserById } from '@/service/userService';
import { BadRequestError } from '@/routes/errors/badRequestError';

export async function isEmailVerified(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/user/isEmailVerified', {
    schema: {
      tags: ['users'],
      summary: 'Verify if user email is verified',
      body: z.object({
        user_id: z.number(),
      }),
      response: {
        200: z.object({}),
        204: z.object({}),
      },
    },
    handler: async (request, reply) => {
      await request.getCurrentUser();

      const { user_id } = request.body;

      const user = await findUserById(user_id);

      if (!user) {
        throw new BadRequestError('User not found');
      }

      if (user.verified_email === 'T') {
        return reply.status(200).send();
      } else {
        return reply.status(204).send();
      }
    },
  });
}
