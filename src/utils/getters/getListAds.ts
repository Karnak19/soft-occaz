import { cache } from 'react';

import { pb } from '../pocketbase';
import { AnnoncesResponse, Collections } from '../pocketbase-types';

export const getListAds = cache(async ({ filter = '', page = 1, perPage = 30 }) => {
  const annonces = await pb.collection(Collections.Annonces).getList<AnnoncesResponse>(page, perPage, {
    sort: '-created',
    filter,
  });
  return annonces;
});
