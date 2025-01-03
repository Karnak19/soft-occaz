import dynamic from 'next/dynamic';

import type { ListingsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { createStaticClient } from '$/utils/pocketbase/static';
import ProductDetails from '$/components/details/ProductDetails';
import Modal from '$/components/Modal';

const SeenTracker = dynamic(() => import('$/components/details/SeenTracker'), { ssr: false });

async function page({ params }: { params: { id: string } }) {
  const pb = await createStaticClient();

  const ad = await pb.collection('listings').getOne<ListingsResponse<string[], { user: UsersResponse }>>(params.id, {
    expand: 'user',
  });

  return (
    <Modal>
      <SeenTracker id={params.id} />
      <ProductDetails {...ad} withoutPT />
    </Modal>
  );
}

export default page;
