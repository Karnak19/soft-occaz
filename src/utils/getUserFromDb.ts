import { cache } from 'react';

import { prisma } from './db';

export const getUserFromDb = cache(async (params: { userId: string } | { clerkId: string }) => {
  const where = 'userId' in params ? { id: params.userId } : { clerkId: params.clerkId };

  const user = await prisma.user.findUniqueOrThrow({ where });
  return user;
});
