import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { prisma } from '../lib/prisma';
import z from 'zod';
import { BadRequestError } from './errors/badRequestError';

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

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new BadRequestError('User already exists');
      }

      const newUser = await prisma.user.create({
        data: {
          email,
          password_hash,
        },
      });

      return reply.status(201).send(newUser);
    },
  });
}
