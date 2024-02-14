import { SubScription } from '@prisma/client';

export const getMaxListingsCount = (sub: SubScription | null) => {
  switch (sub) {
    case 'PREMIUM':
      return '∞';
    case 'GEARDO':
      return 100;
    case 'HOBBY':
      return 100;
    case 'FREE':
    default:
      return 50;
  }
};
