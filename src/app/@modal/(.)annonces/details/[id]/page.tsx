import { getListing } from '$/utils/cached/getListing';
import ProductDetails from '$/components/details/ProductDetails';
import SeenTracker from '$/components/details/SeenTracker';
import Modal from '$/components/Modal';

async function page({ params }: { params: { id: string } }) {
  const ad = await getListing(params.id);

  return (
    <Modal>
      <>
        <SeenTracker />
        <ProductDetails {...ad} withoutPT />
      </>
    </Modal>
  );
}

export default page;
