import { cache } from 'react';

import { prisma } from './db';

export const getUserFromDb = cache(async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  return user;
});
