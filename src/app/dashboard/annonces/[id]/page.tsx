import dynamic from 'next/dynamic';

import { Collections, ListingsResponse } from '$/utils/pocketbase/pocketbase-types';
import { createServerClient } from '$/utils/pocketbase/server';

const ListingForm = dynamic(() => import('$/components/Form/ListingForm'));

async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const pb = await createServerClient();

  const data = await pb.collection(Collections.Listings).getOne<ListingsResponse<string[]>>(params.id);

  return <ListingForm edit={data} />;
}

export default Page;
