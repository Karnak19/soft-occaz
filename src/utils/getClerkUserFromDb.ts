import { currentUser } from '@clerk/nextjs';

import { prisma } from './db';

export async function getClerkUserFromDb() {
  const _user = await currentUser();

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
          avatar: _user.profileImageUrl,
          username: _user.username,
        },
      });
    });

  return user;
}
