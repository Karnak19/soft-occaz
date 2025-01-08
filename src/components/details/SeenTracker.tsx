'use client';

import { useQuery } from '@tanstack/react-query';
import { getCookie, setCookie } from 'cookies-next';
import { useState } from 'react';

import { usePocketbase, useUser } from '$/app/pocketbase-provider';

export default function SeenTracker({ id }: { id: string }) {
  const [seen] = useState(() => getCookie(`seen-${id}`) === 'true');
  const { pb } = usePocketbase();
  const user = useUser();

  useQuery({
    queryKey: ['listings', 'seen', id],
    queryFn: async () => {
      await pb.collection('users_seen_listings').create({
        user: user?.id ?? null,
        listing: id,
      });

      setCookie(`seen-${id}`, 'true', { maxAge: 60 * 60 });
    },
    enabled: !seen,
  });

  return null;
}
