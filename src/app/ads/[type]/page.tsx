import ProductList from "$/components/ProductList";
import { AdsTypeOptions } from "$/utils/pocketbase-types";
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

async function page({ params }: { params: { type: AdsTypeOptions } }) {
  // @ts-ignore Async server component
  return <ProductList filter={`type = "${params.type}"`} />;
}

export default page;
