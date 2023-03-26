import { cache } from 'react';

import { pb } from '../pocketbase';
import { AnnoncesResponse, Collections } from '../pocketbase-types';

// we cache the data to avoid fetching it twice
// because Pocketbase will cancel the previous request
// https://github.com/pocketbase/js-sdk#auto-cancellation
export const getSingleAd = cache(async (id: string) => {
  return pb.collection(Collections.Annonces).getOne<AnnoncesResponse>(id);
});
