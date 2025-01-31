import nextdynamic from 'next/dynamic';

import Modal from '$/components/Modal';
import ProductDetails from '$/components/details/ProductDetails';
import type { ListingsResponse, ReportsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { createStaticClient } from '$/utils/pocketbase/static';

const SeenTracker = nextdynamic(() => import('$/components/details/SeenTracker'));

type GetOneListing = ListingsResponse<string[], { user: UsersResponse; reports_via_listing: ReportsResponse[] }>;

export const dynamic = 'force-static';
async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
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
