import { type Prisma, PrismaClient } from '@prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

import { env } from '$/env';

neonConfig.webSocketConstructor = ws;

// Init prisma client
const pool = new Pool({ connectionString: env.DATABASE_URL });
const adapter = new PrismaNeon(pool);
export const prisma = new PrismaClient({ adapter });

export type ListingWithUser = Prisma.ListingGetPayload<{
  include: { user: true };
}>;

export type ListingWithUserAndRating = Prisma.ListingGetPayload<{
  include: {
    user: true;
    rating: { include: { from: true } };
  };
}>;
