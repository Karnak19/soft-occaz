import ProductList from '$/app/annonces/products-list-rsc';

export const revalidate = 30;
export const metadata = {
  title: 'Annonces',
};

async function Page({
  searchParams,
}: {
  searchParams?: {
    min: string;
    max: string;
    layout: 'list' | 'grid';
  };
}) {
  return <ProductList searchParams={searchParams} />;
}

export default Page;
