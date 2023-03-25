import { pb } from "$/utils/pocketbase";
import { Collections, AdsResponse } from "$/utils/pocketbase-types";
import ProductCard from "./ProductCard";

async function getData(filter = "") {
  console.log(filter);
  const ads = await pb.collection(Collections.Ads).getList<AdsResponse>(1, 30, {
    sort: "-created",
    filter,
  });
  return ads;
}

async function ProductList({ filter }: { filter?: string }) {
  const ads = await getData(filter);

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

export default ProductList;
