'use client';

import dynamic from 'next/dynamic';

const ListingCreation = dynamic(() => import('$/components/Form/ListingCreation'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

function Page() {
  return <ListingCreation />;
}

export default Page;
