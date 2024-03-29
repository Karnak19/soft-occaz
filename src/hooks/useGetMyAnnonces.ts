import { useUser } from '@clerk/nextjs';
import { Listing } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

export function useGetMyAnnonces() {
  const { user } = useUser();

  return useQuery({
    queryKey: ['my-annonces', user?.id],
    queryFn: async () => fetch(`/api/users/me/listings`).then((res) => res.json()) as Promise<Listing[]>,
    enabled: !!user,
  });
}
