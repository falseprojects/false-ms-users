import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { updateWishlistService } from '../../service/userWishlistService';

export async function updateWishlist(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put('/wishlist/update', {
    schema: {
      tags: ['wishlists'],
      summary: 'Update an existing wishlist for a user',
      body: z.object({
        user_wishlist_id: z.number(),
        wishlist_name: z.string().min(1, 'Wishlist name cannot be empty'),
        products_ids: z.array(z.number()),
      }),
      response: {
        200: z.object({
          user_wishlist_id: z.number(),
          wishlist_name: z.string(),
          products_ids: z.array(z.number()),
          created_at: z.date(),
          updated_at: z.date(),
        }),
      },
    },
    handler: async (request, reply) => {
      await request.getCurrentUser();

      const { user_wishlist_id, wishlist_name, products_ids } = request.body;

      const updatedWishlist = await updateWishlistService(
        user_wishlist_id,
        wishlist_name,
        products_ids
      );

      return reply.status(200).send(updatedWishlist);
    },
  });
}
