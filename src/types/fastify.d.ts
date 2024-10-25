import 'fastify';

import { Member, Organization } from '@prisma/client';

interface LoggedUser {
  user_id: number;
  email: string;
}

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUser(): Promise<LoggedUser>;
  }
}
