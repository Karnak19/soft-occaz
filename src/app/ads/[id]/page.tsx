import { pb } from "$/utils/pocketbase";
import { AdsResponse, Collections } from "$/utils/pocketbase-types";

async function page({ params }: { params: { id: string } }) {
  const ad = await pb
    .collection(Collections.Ads)
    .getOne<AdsResponse>(params.id);

  return (
    <div>
      <h1>{ad.title}</h1>
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
