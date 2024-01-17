import { currentUser } from '@clerk/nextjs/server';

import { prisma } from './db';

export async function getClerkUserFromDb(defaultUser?: Awaited<ReturnType<typeof currentUser>>) {
  const _user = defaultUser ?? (await currentUser());

  if (!_user) {
    throw new Error('Unauthorized');
  }

  const user = await prisma.user
    .findUniqueOrThrow({
      where: { clerkId: _user.id },
    })
    .catch(() => {
      return prisma.user.create({
        data: {
          clerkId: _user.id,
          email: _user.emailAddresses[0].emailAddress,
          firstName: _user.firstName ?? '',
          lastName: _user.lastName ?? '',
          avatar: _user.imageUrl,
          username: _user.username,
        },
      });
    });

  return user;
}
