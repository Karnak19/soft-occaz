import ProductList from '$/components/ProductList';

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
  };
}) {
  // @ts-ignore Async server component
  return <ProductList searchParams={searchParams} />;
}

export default Page;
