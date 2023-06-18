import { cache } from 'react';

import { db } from '../db';

export const getSingleAd = cache(async (id: string) => {
  return db.listing.findUniqueOrThrow({ where: { id } });
});
