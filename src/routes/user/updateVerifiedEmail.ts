import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { findUserById, updateUserVerifiedEmail } from '@/service/userService';
import { BadRequestError } from '@/routes/errors/badRequestError';

export async function updateVerifiedEmail(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put('/user/updateVerifiedEmail', {
    schema: {
      tags: ['users'],
      summary: 'Update user email verification status',
      body: z.object({
        user_id: z.number(),
        verified_email: z.enum(['T', 'F']),
      }),
      response: {
        200: z.object({}),
      },
    },
    handler: async (request, reply) => {
      await request.getCurrentUser();

      //ToDo: Buscar user_id do token

      const { user_id, verified_email } = request.body;

      const user = await findUserById(user_id);

      if (!user) {
        throw new BadRequestError('User not found');
      }

      await updateUserVerifiedEmail(user_id, verified_email);

      return reply.status(200).send();
    },
  });
}
