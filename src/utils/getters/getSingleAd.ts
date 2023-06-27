import { cache } from 'react';

import { prisma } from '../db';

export const getSingleAd = cache(async (id: string) => {
  return prisma.listing.findUniqueOrThrow({
    where: { id },
    include: { user: true },
  });
});
