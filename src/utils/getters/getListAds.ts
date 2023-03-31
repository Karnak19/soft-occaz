import { cache } from 'react';

import { pb } from '../pocketbase';
import { AnnoncesResponse, Collections, UsersResponse } from '../pocketbase-types';

export const getListAds = cache(async ({ filter = '', page = 1, perPage = 30 }) => {
  const annonces = await pb.collection(Collections.Annonces).getList<AnnoncesResponse<{ user: UsersResponse }>>(page, perPage, {
    sort: '-created',
    filter,
    expand: 'user',
  });
  return annonces;
});
