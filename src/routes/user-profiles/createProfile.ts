import { createProfileService } from '@/service/userProfilesService';
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';

export async function createProfile(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/profiles/create', {
    schema: {
      tags: ['profiles'],
      summary: 'Create a new profile for a user',
      body: z.object({
        user_id: z.number(),
        name: z.string(),
        last_name: z.string(),
        phone: z.string(),
        birth_date: z.string(),
        document: z.string(),
        contact_preference: z.string(),
        gender: z.string(),
      }),
      response: {
        201: z.object({
          user_profile_id: z.number(),
          user_id: z.number(),
          name: z.string(),
          last_name: z.string(),
          phone: z.string(),
          birth_date: z.string(),
          document: z.string(),
          contact_preference: z.string(),
          gender: z.string(),
          created_at: z.date(),
          updated_at: z.date(),
        }),
      },
    },
    handler: async (request, reply) => {
      await request.getCurrentUser();

      const {
        user_id,
        name,
        last_name,
        phone,
        birth_date,
        document,
        contact_preference,
        gender,
      } = request.body;

      const newProfile = await createProfileService({
        user_id,
        name,
        last_name,
        phone,
        birth_date,
        document,
        contact_preference,
        gender,
      });

      return reply.status(201).send(newProfile);
    },
  });
}
