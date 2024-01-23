import { env } from '$/env';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient, type Prisma } from '@prisma/client';
import ws from 'ws';

const local = env.NODE_ENV === 'development';

if (!local) {
  neonConfig.webSocketConstructor = ws;
}

// Init prisma client
export const prisma = new PrismaClient(
  !local
    ? {
        adapter: new PrismaNeon(new Pool({ connectionString: env.DATABASE_URL })),
      }
    : undefined,
);

export type ListingWithUser = Prisma.ListingGetPayload<{
  include: { user: true };
}>;

export type ListingWithUserAndRating = Prisma.ListingGetPayload<{
  include: {
    user: true;
    rating: { include: { from: true } };
  };
}>;
