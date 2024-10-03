import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { prisma } from '@/lib/prisma';
import { BadRequestError } from '../errors/badRequestError';

export async function updateUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put('/user/update/:userId', {
    schema: {
      tags: ['users'],
      summary: 'Update an existing user',
      params: z.object({
        userId: z.string(),
      }),
      body: z.object({
        email: z.string().email().optional(),
        password_hash: z
          .string()
          .min(8, 'Password must be at least 8 characters')
          .optional(),
        user_wishlist_id: z.number().nullable().optional(),
      }),
      response: {
        200: z.object({
          user_id: z.number(),
          email: z.string(),
          user_wishlist_id: z.number().nullable(),
          created_at: z.date(),
          updated_at: z.date(),
        }),
      },
    },
    handler: async (request, reply) => {
      await request.getCurrentUser();

      const { userId } = request.params;
      const { email, password_hash, user_wishlist_id } = request.body;

      const id = parseInt(userId);

      const existingUser = await prisma.user.findUnique({
        where: { user_id: id },
      });

      if (!existingUser) {
        throw new BadRequestError('User not found');
      }

      if (email && email !== existingUser.email) {
        const emailConflict = await prisma.user.findUnique({
          where: { email },
        });

        if (emailConflict) {
          throw new BadRequestError('Email already in use by another user');
        }
      }

      const updatedUser = await prisma.user.update({
        where: { user_id: id },
        data: {
          email: email ?? existingUser.email,
          password_hash: password_hash ?? existingUser.password_hash,
          user_wishlist_id: user_wishlist_id ?? existingUser.user_wishlist_id,
        },
      });

      return reply.status(200).send(updatedUser);
    },
  });
}
