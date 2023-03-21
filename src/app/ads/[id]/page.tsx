import Badge from "$/components/Badge";
import ProductDetails from "$/components/ProductDetails";
import { SendBadge } from "$/components/SendBadge";
import { pb } from "$/utils/pocketbase";
import { AdsResponse, Collections } from "$/utils/pocketbase-types";

async function page({ params }: { params: { id: string } }) {
  const ad = await pb
    .collection(Collections.Ads)
    .getOne<AdsResponse>(params.id);

  return <ProductDetails {...ad} />;

  return (
    <div>
      <h1>{ad.title}</h1>
      <div className="flex items-center gap-5">
        <Badge variant={ad.type} />
        <SendBadge send={ad.envoi} />
      </div>
      <div
        className="prose prose-zinc dark:prose-invert"
        dangerouslySetInnerHTML={{
          __html: ad.description,
        }}
      />
    </div>
  );
}

export default page;
