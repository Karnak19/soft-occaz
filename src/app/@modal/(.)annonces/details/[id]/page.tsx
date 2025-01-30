import dynamic from 'next/dynamic';

import Modal from '$/components/Modal';
import ProductDetails from '$/components/details/ProductDetails';
import type { ListingsResponse, ReportsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { createStaticClient } from '$/utils/pocketbase/static';

const SeenTracker = dynamic(() => import('$/components/details/SeenTracker'), { ssr: false });

type GetOneListing = ListingsResponse<string[], { user: UsersResponse; reports_via_listing: ReportsResponse[] }>;

async function page({ params }: { params: { id: string } }) {
  const pb = await createStaticClient();

  const ad = await pb.collection('listings').getOne<GetOneListing>(params.id, {
    expand: 'user,reports_via_listing',
  });

  return (
    <Modal>
      <SeenTracker id={params.id} />
      <ProductDetails {...ad} withoutPT />
    </Modal>
  );
}

export default page;
