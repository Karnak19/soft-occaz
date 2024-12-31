import type { ListingsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { createStaticClient } from '$/utils/pocketbase/static';
import ProductDetails from '$/components/details/ProductDetails';
import SeenTracker from '$/components/details/SeenTracker';
import Modal from '$/components/Modal';

async function page({ params }: { params: { id: string } }) {
  const pb = await createStaticClient();

  const ad = await pb.collection('listings').getOne<ListingsResponse<string[], { user: UsersResponse }>>(params.id, {
    expand: 'user',
  });

  return (
    <Modal>
      <SeenTracker />
      <ProductDetails {...ad} withoutPT />
    </Modal>
  );
}

export default page;
