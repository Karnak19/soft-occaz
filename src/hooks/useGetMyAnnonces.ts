import { useQuery } from '@tanstack/react-query';

import { usePocket } from '$/components/PocketContext';
import { AnnoncesResponse, Collections } from '$/utils/pocketbase-types';

export function useGetMyAnnonces() {
  const { pb } = usePocket();

  return useQuery({
    queryKey: ['annonces', {}],
    queryFn: () =>
      pb.collection(Collections.Annonces).getList<AnnoncesResponse>(1, 15, {
        sort: '-created',
        // filter: `user.id = "${user.id}"`,
      }),
  });
}
