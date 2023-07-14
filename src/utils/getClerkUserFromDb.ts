import { currentUser } from '@clerk/nextjs';

import { prisma } from './db';

export async function getClerkUserFromDb() {
  const _user = await currentUser();

  if (!_user) {
    throw new Error('Unauthorized');
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { clerkId: _user.id },
  });

  return user;
}
