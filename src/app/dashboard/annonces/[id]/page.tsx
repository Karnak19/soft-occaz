import dynamic from 'next/dynamic';

import { prisma } from '$/utils/db';

const ListingCreation = dynamic(() => import('$/components/Form/ListingCreation'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export const revalidate = 60;

async function Page({ params }: { params: { id: string } }) {
  const data = await prisma.listing.findUniqueOrThrow({ where: { id: params.id } });

  return <ListingCreation edit={data} />;
}

export default Page;
