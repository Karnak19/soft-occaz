import { type Prisma, PrismaClient } from '@prisma/client';
import { PrismaClient as EdgeClient } from '@prisma/client/edge';

import { env } from '$/env';

const Client = env.VERCEL_ENV === 'production' ? EdgeClient : PrismaClient;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new Client();

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export type ListingWithUser = Prisma.ListingGetPayload<{
  include: { user: true };
}>;

export type ListingWithUserAndRating = Prisma.ListingGetPayload<{
  include: {
    user: true;
    rating: {
      include: { from: true };
    };
  };
}>;
