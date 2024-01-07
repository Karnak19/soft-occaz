'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

function SeenTracker() {
  const params = useParams();

  const { status } = useQuery({
    queryKey: ['listings', 'seen', params.id],
    queryFn: () => fetch(`/api/listings/${params.id}/view`, { method: 'POST' }),
    enabled: !sessionStorage?.getItem(`seen-${params.id}`),
  });

  useEffect(() => {
    const onSuccess = () => {
      sessionStorage.setItem(`seen-${params.id}`, 'true');
    };

    if (status === 'success') {
      onSuccess();
    }
  }, [status, params.id]);

  return null;
}

export default SeenTracker;
