import ProductDetails from '$/components/details/ProductDetails';
import SeenTracker from '$/components/details/SeenTracker';
import Modal from '$/components/Modal';
import { getSingleAd } from '$/utils/getters/getSingleAd';

async function page({ params }: { params: { id: string } }) {
  const ad = await getSingleAd(params.id);

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
