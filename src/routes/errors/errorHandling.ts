import { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';
import { UnauthorizedError } from './unauthorizedError';
import { BadRequestError } from './badRequestError';

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      errors: error.flatten().fieldErrors,
    });
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message,
    });
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({
      message: error.message,
    });
  }

  console.error(error);

  return reply.status(500).send({ message: 'Internar server error' });
};
