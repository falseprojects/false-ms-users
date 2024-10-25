import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { getProfileByUserService } from '../../service/userProfilesService';
import { BadRequestError } from '../errors/badRequestError';

export async function getProfileByUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/profiles/user', {
    schema: {
      tags: ['profiles'],
      summary: 'Get profile for a user',
      response: {
        200: z.object({
          user_profile_id: z.number(),
          user_id: z.number(),
          name: z.string(),
          last_name: z.string(),
          phone: z.string(),
          birth_date: z.string().nullable(),
          document: z.string().nullable(),
          contact_preference: z.string().nullable(),
          gender: z.string().nullable(),
          created_at: z.date(),
          updated_at: z.date(),
        }),
      },
    },
    handler: async (request, reply) => {
      const { user_id } = await request.getCurrentUser();

      const profile = await getProfileByUserService(user_id);

      if (!profile) {
        throw new BadRequestError('Profile not found');
      }

      return reply.status(200).send(profile);
    },
  });
}
