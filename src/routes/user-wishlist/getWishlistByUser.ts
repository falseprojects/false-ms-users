import { getWishlistByUserService } from '@/service/userWishlistService';
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';

export async function getWishlistByUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/wishlist/user', {
    schema: {
      tags: ['wishlists'],
      summary: 'Get all wishlists for a user',
      body: z.object({
        user_id: z.number(),
      }),
      response: {
        200: z.array(
          z.object({
            user_wishlist_id: z.number(),
            wishlist_name: z.string(),
            user_id: z.number(),
            products_ids: z.array(z.number()),
            created_at: z.date(),
            updated_at: z.date(),
          })
        ),
      },
    },
    handler: async (request, reply) => {
      await request.getCurrentUser();
      const { user_id } = request.body;

      const wishlists = await getWishlistByUserService(user_id);

      return reply.status(200).send(wishlists);
    },
  });
}
