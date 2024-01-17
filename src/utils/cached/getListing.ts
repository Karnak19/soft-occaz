import { prisma } from '../db';

export const getListing = async (id: string) => {
  return prisma.listing.findUniqueOrThrow({
    where: { id },
    include: {
      user: true,
      rating: {
        include: { from: true },
      },
    },
  });
};
