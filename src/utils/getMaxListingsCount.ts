import { SubScription } from '@prisma/client';

export const getMaxListingsCount = (sub: SubScription | null) => {
  switch (sub) {
    case 'PREMIUM':
      return Infinity;
    case 'GEARDO':
      return 50;
    case 'HOBBY':
      return 10;
    case 'FREE':
    default:
      return 5;
  }
};
