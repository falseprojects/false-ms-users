import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
  findUserByEmail,
  updateUserVerifiedEmail,
} from '../../service/userService';
import { BadRequestError } from '../errors/badRequestError';

export async function updateVerifiedEmail(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put('/user/updateVerifiedEmail', {
    schema: {
      tags: ['users'],
      summary: 'Update user email verification status',
      body: z.object({
        email: z.string().email(),
      }),
      response: {
        200: z.object({}),
      },
    },
    handler: async (request, reply) => {
      const { email } = request.body;

      const user = await findUserByEmail(email);

      if (!user) {
        throw new BadRequestError('User not found');
      }

      await updateUserVerifiedEmail(email);

      return reply.status(200).send();
    },
  });
}
