import { Metadata } from 'next';

import ProductList from '$/components/ProductList';
import { AdsTypeOptions } from '$/utils/pocketbase-types';

export const revalidate = 30;

export async function generateMetadata({ params }: { params: { type: AdsTypeOptions } }): Promise<Metadata> {
  return {
    title: `Annonces ${params.type.toUpperCase()}`,
    description: `Toutes les annonces ${params.type}`,
  };
}

async function page({ params }: { params: { type: AdsTypeOptions } }) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Async server component
  return <ProductList filter={`type = "${params.type}"`} />;
}

export default page;
