import { User } from '@prisma/client';

import { prisma } from './db';
import { ERROR_CODES, ERRORS } from './errors';
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

  const realMaxListingsCount = maxListingsCount === '∞' ? Infinity : maxListingsCount;

  if (listingCount >= realMaxListingsCount) {
    throw new Error(ERRORS.get(ERROR_CODES.MAX_LISTINGS_REACHED));
  }

  return true;
}
