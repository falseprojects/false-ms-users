import { createWishlistService } from '@/service/userWishlistService';
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';

export async function createWishlist(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/wishlist/create', {
    schema: {
      tags: ['wishlists'],
      summary: 'Create a new wishlist for a user',
      body: z.object({
        wishlist_name: z.string().min(1, 'Wishlist name cannot be empty'),
        products_ids: z.array(z.number()),
      }),
      response: {
        201: z.object({
          user_wishlist_id: z.number(),
          wishlist_name: z.string(),
          user_id: z.number(),
          products_ids: z.array(z.number()),
          created_at: z.date(),
          updated_at: z.date(),
        }),
      },
    },
    handler: async (request, reply) => {
      const { user_id } = await request.getCurrentUser();
      const { wishlist_name, products_ids } = request.body;

      const newWishlist = await createWishlistService(
        wishlist_name,
        user_id,
        products_ids
      );

      return reply.status(201).send(newWishlist);
    },
  });
}
