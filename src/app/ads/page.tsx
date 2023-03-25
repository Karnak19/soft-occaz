import ProductCard from "$/components/ProductCard";
import { pb } from "$/utils/pocketbase";
import { AdsResponse, Collections } from "$/utils/pocketbase-types";

export const revalidate = 30;
export const metadata = {
  title: "Annonces",
  description: "Toutes les annonces",
};

async function getData() {
  const ads = await pb.collection(Collections.Ads).getList<AdsResponse>(1, 30, {
    sort: "-created",
  });
  return ads;
}

async function page() {
  const ads = await getData();

  return (
    <ul className="flex flex-col gap-3 border-zinc-600">
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
