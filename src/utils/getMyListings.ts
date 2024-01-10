import { currentUser } from '@clerk/nextjs';
import { prisma } from './db';

export async function getMyListings() {
  const _user = await currentUser();

  if (!_user) {
    throw new Error('Unauthorized');
  }

  return prisma.listing.findMany({
    where: { user: { clerkId: _user.id } },
    orderBy: { createdAt: 'desc' },
  });
}
