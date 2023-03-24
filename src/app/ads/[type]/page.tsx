import ProductCard from "$/components/ProductCard";
import { pb } from "$/utils/pocketbase";
import { AdsTypeOptions } from "$/utils/pocketbase-types";
import { AdsResponse, Collections } from "$/utils/pocketbase-types";
import { Metadata } from "next";

export const revalidate = 30;

export async function generateMetadata({
  params,
}: {
  params: { type: AdsTypeOptions };
}): Promise<Metadata> {
  return {
    title: "Annonces " + params.type.toUpperCase(),
    description: "Toutes les annonces " + params.type,
  };
}

async function getData(type: AdsTypeOptions) {
  const ads = await pb.collection(Collections.Ads).getList<AdsResponse>(1, 30, {
    sort: "-created",
    filter: `type = "${type}"`,
  });
  return ads;
}

async function page({ params }: { params: { type: AdsTypeOptions } }) {
  const ads = await getData(params.type);

  return (
    <ul className="flex flex-col gap-3 border-zinc-600 sm:mx-0">
      {ads.items.map((ad) => (
        <li key={ad.id}>
          <ProductCard
            {...{
              href: `/ads/details/${ad.id}`,
              ...ad,
            }}
          />
        </li>
      ))}
    </ul>
  );
}

export default page;
