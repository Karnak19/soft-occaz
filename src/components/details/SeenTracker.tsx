'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

function SeenTracker() {
  const params = useParams();

  useQuery(['listings', 'seen', params.id], () => fetch(`/api/listings/${params.id}/view`, { method: 'POST' }), {
    enabled: !sessionStorage?.getItem(`seen-${params.id}`),
    onSuccess: () => {
      sessionStorage.setItem(`seen-${params.id}`, 'true');
    },
  });

  return null;
}

export default SeenTracker;
