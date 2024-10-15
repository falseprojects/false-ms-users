import { updatePointsService } from '@/service/userPointsService';
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';

export async function updatePoints(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put('/points/update', {
    schema: {
      tags: ['points'],
      summary: 'Update points for a user',
      body: z.object({
        point_amount: z.number(),
        operation: z.enum(['increase', 'decrease']),
      }),
      response: {
        200: z.object({
          user_id: z.number(),
          point_amount: z.number(),
          created_at: z.date(),
          updated_at: z.date(),
        }),
      },
    },
    handler: async (request, reply) => {
      const { user_id } = await request.getCurrentUser();
      const { operation, point_amount } = request.body;

      const updatedPoints = await updatePointsService(
        user_id,
        point_amount,
        operation
      );

      return reply.status(200).send(updatedPoints);
    },
  });
}
