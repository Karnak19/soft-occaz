import { User } from '@prisma/client';

import { prisma } from './db';
import { getClerkUserFromDb } from './getClerkUserFromDb';
import { getMaxListingsCount } from './getMaxListingsCount';

export async function listingCreationCheck(user?: User) {
  let _user = user;

  if (!_user) {
    _user = await getClerkUserFromDb();
  }

  const listingCount = await prisma.listing.count({
    where: { userId: _user.id },
  });

  const maxListingsCount = getMaxListingsCount(_user.sub);

  if (listingCount >= maxListingsCount) {
    throw new Error('You have reached your maximum listing count');
  }

  return true;
}
