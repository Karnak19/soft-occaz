import { Type } from '@prisma/client';

import { prisma } from '$/utils/db';

export async function getSearch(q: string) {
  const words = q.split(' ');

  const typesArray = Object.values(Type);

  const types = words
    .filter((word) => typesArray.map((type) => type.toLowerCase()).includes(word.toLowerCase()))
    .map((word) => {
      return Object.entries(Type).find(([_key, value]) => value.toLowerCase() === word.toLowerCase())?.[0];
    });

  const wordsWithoutTypes = words.filter((word) => !typesArray.map((type) => type.toLowerCase()).includes(word.toLowerCase()));

  const listings = await prisma.listing.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
    where: {
      ...(wordsWithoutTypes.length > 0
        ? {
            OR: [
              ...wordsWithoutTypes.map((word) => {
                return { title: { contains: word, mode: 'insensitive' } } as const;
              }),
              ...wordsWithoutTypes.map((word) => {
                return { description: { contains: word, mode: 'insensitive' } } as const;
              }),
            ],
          }
        : {}),
      ...(types.length > 0 ? { AND: types.map((type) => ({ type: { equals: type as Type } })) } : {}),
    },
  });

  // const premiumListings = listings.filter((listing) => listing.user?.sub?.toLowerCase() === 'premium');

  // const nonPremiumListings = listings.filter((listing) => listing.user?.sub?.toLowerCase() !== 'premium');

  const [premiumListings, nonPremiumListings] = listings.reduce(
    (acc, listing) => {
      if (listing.sold) {
        return acc;
      }

      if (listing.user?.sub?.toLowerCase() === 'premium') {
        acc[0].push(listing);
      } else {
        acc[1].push(listing);
      }

      return acc;
    },
    [[], []] as [typeof listings, typeof listings],
  );

  return [...premiumListings, ...nonPremiumListings];
}
