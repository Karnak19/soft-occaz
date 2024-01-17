import dynamic from 'next/dynamic';

import { prisma } from '$/utils/db';

const ListingForm = dynamic(() => import('$/components/Form/ListingForm'), { ssr: false });

async function Page({ params }: { params: { id: string } }) {
  const data = await prisma.listing.findUniqueOrThrow({ where: { id: params.id } });

  return <ListingForm edit={data} />;
}

export default Page;
