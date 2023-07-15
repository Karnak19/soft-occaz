'use client';
import dynamic from 'next/dynamic';

import AbsoluteBlurredSpinner from '$/components/AbsoluteBlurredSpinner';
import { useGetMyAnnonces } from '$/hooks/useGetMyAnnonces';

import EmptyList from './EmptyList';
import ListItem from './ListItem';

const Stats = dynamic(() => import('./Stats'), { ssr: false });

export default function page() {
  const { data, isLoading } = useGetMyAnnonces();

  const views = data?.reduce((acc, annonce) => acc + annonce.seenCount, 0) || 0;

  return (
    <div className="overflow-hidden relative bg-white shadow sm:rounded-md">
      <Stats views={views} listingCount={data?.length || 0} />
      <AbsoluteBlurredSpinner isLoading={isLoading} />
      {data?.length ? (
        <ul className="divide-y divide-gray-200">
          {data?.map((annonce) => (
            <ListItem key={annonce.id} {...annonce} />
          ))}
        </ul>
      ) : (
        <EmptyList />
      )}
    </div>
  );
}
