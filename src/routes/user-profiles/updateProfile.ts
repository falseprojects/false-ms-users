import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { updateProfileService } from '../../service/userProfilesService';

export async function updateProfile(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put('/profiles/update', {
    schema: {
      tags: ['profiles'],
      summary: 'Update a user profile',
      body: z.object({
        name: z.string(),
        last_name: z.string(),
        phone: z.string(),
        birth_date: z.string(),
        document: z.string(),
        contact_preference: z.string(),
        gender: z.string(),
      }),
      response: {
        200: z.object({
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

      const {
        name,
        last_name,
        phone,
        birth_date,
        document,
        contact_preference,
        gender,
      } = request.body;

      const updatedProfile = await updateProfileService({
        user_id,
        name,
        last_name,
        phone,
        birth_date,
        document,
        contact_preference,
        gender,
      });

      return reply.status(200).send(updatedProfile);
    },
  });
}
