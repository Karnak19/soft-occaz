import { prisma } from '../db';

export const getListings = async () => {
  return prisma.listing.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });
};

export const getLatestListings = async (take?: number) => {
  return prisma.listing.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
    take: take ?? 4,
  });
};
