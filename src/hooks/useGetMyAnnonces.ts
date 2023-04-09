import { useQuery } from '@tanstack/react-query';

import { usePocket } from '$/components/PocketContext';
import { AnnoncesResponse, Collections } from '$/utils/pocketbase-types';

export function useGetMyAnnonces() {
  const { user, pb } = usePocket();

  return useQuery({
    queryKey: ['annonces', { userId: user.id }],
    queryFn: () =>
      pb.collection(Collections.Annonces).getList<AnnoncesResponse>(1, 15, {
        sort: '-created',
        filter: `user.id = "${user.id}"`,
      }),
  });
}
