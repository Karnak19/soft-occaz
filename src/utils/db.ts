import { neonConfig, Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient, type Prisma } from '@prisma/client';
import { env } from '$/env';
import ws from 'ws';

const local = env.NODE_ENV === 'development';

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (!local) {
  neonConfig.webSocketConstructor = ws;
  prisma = new PrismaClient({
    adapter: new PrismaNeon(new Pool({ connectionString: env.DATABASE_URL })),
  });
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
  }

  prisma = globalThis.prisma;
}

// Init prisma client
export { prisma };

export type ListingWithUser = Prisma.ListingGetPayload<{
  include: { user: true };
}>;

export type ListingWithUserAndRating = Prisma.ListingGetPayload<{
  include: {
    user: true;
    rating: { include: { from: true } };
  };
}>;
