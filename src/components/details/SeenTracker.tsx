'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

function sessionGet(key: string) {
  let stringValue = sessionStorage.getItem(key);
  if (stringValue !== null) {
    let value = JSON.parse(stringValue);
    let expirationDate = new Date(value.expirationDate);
    if (expirationDate > new Date()) {
      return value.value;
    } else {
      window.sessionStorage.removeItem(key);
    }
  }
  return null;
}

function sessionSet(key: string, value: any, expirationInMin = 60) {
  let expirationDate = new Date(new Date().getTime() + 60000 * expirationInMin);
  let newValue = {
    value: value,
    expirationDate: expirationDate.toISOString(),
  };
  sessionStorage.setItem(key, JSON.stringify(newValue));
}

function SeenTracker() {
  const params = useParams();

  const { status } = useQuery({
    queryKey: ['listings', 'seen', params.id],
    queryFn: () => fetch(`/api/listings/${params.id}/view`, { method: 'POST' }),
    enabled: !sessionGet(`seen-${params.id}`),
  });

  useEffect(() => {
    const onSuccess = () => {
      sessionSet(`seen-${params.id}`, true);
    };

    if (status === 'success') {
      onSuccess();
    }
  }, [status, params.id]);

  return null;
}

export default SeenTracker;
