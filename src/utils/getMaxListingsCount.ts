import { SubScription } from '@prisma/client';

export const getMaxListingsCount = (sub: SubScription | null) => {
  switch (sub) {
    case 'PREMIUM':
      return '∞';
    case 'GEARDO':
      return 50;
    case 'HOBBY':
      return 20;
    case 'FREE':
    default:
      return 10;
  }
};
