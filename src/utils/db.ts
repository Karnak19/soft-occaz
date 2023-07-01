import { type Prisma, PrismaClient } from '@prisma/client';
import { PrismaClient as EdgeClient } from '@prisma/client/edge';

const Client = process.env.VERCEL_ENV === 'production' ? EdgeClient : PrismaClient;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new Client();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export type ListingWithUser = Prisma.ListingGetPayload<{
  include: { user: true };
}>;
