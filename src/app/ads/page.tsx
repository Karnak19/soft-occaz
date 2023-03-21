import ProductCard from "$/components/ProductCard";
import { pb } from "$/utils/pocketbase";
import { AdsResponse, Collections } from "$/utils/pocketbase-types";

async function page() {
  const ads = await pb.collection(Collections.Ads).getList<AdsResponse>();

  return (
    <div>
      <h1>Ads</h1>

      <ul className="border grid grid-cols-2 border-zinc-600 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
        {ads.items.map((ad) => (
          <li key={ad.id}>
            <ProductCard
              {...{
                href: `/ads/${ad.id}`,
                imageSrc: "https://i.imgur.com/G7dEgSX.jpg",
                ...ad,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default page;
