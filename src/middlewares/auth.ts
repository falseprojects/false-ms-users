import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { UnauthorizedError } from '../routes/errors/unauthorizedError';
import { LoggedUser } from '@/types/fastify';

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUser = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: LoggedUser }>();
        return sub;
      } catch (error) {
        throw new UnauthorizedError('Invalid auth token');
      }
    };
  });
});
