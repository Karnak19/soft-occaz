'use client';

import dynamic from 'next/dynamic';

const ListingForm = dynamic(() => import('$/components/Form/ListingForm'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

function Page() {
  return <ListingForm />;
}

export default Page;
