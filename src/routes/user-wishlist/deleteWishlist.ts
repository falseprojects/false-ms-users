import { deleteWishlistService } from '@/service/userWishlistService';
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';

export async function deleteWishlist(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .delete('/wishlist/delete/:userWishlistId', {
      schema: {
        tags: ['wishlists'],
        summary: 'Delete a wishlist by its ID',
        params: z.object({
          userWishlistId: z.number(),
        }),
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
      handler: async (request, reply) => {
        await request.getCurrentUser();
        const { userWishlistId } = request.params;

        await deleteWishlistService(userWishlistId);

        return reply
          .status(200)
          .send({ message: 'Wishlist deleted successfully' });
      },
    });
}
