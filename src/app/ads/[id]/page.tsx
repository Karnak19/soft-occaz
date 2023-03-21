import ProductDetails from "$/components/ProductDetails";
import { pb } from "$/utils/pocketbase";
import { AdsResponse, Collections } from "$/utils/pocketbase-types";

export const revalidate = 600;

async function page({ params }: { params: { id: string } }) {
  const ad = await pb
    .collection(Collections.Ads)
    .getOne<AdsResponse>(params.id);

  return <ProductDetails {...ad} />;
}

export default page;
