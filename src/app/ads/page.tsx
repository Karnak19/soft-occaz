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
    <div>
      <h1>Ads</h1>

      <div className="grid md:grid-cols-[theme(width.64),1fr]">
        <div>
          <h2>Recent ads</h2>
        </div>
        <div>
          <ul className="flex flex-col gap-3 border-zinc-600 sm:mx-0">
            {ads.items.map((ad) => (
              <li key={ad.id}>
                <ProductCard
                  {...{
                    href: `/ads/${ad.id}`,
                    ...ad,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default page;
