import ProductList from '$/components/ProductList';

export const revalidate = 30;
export const metadata = {
  title: 'Annonces',
};

async function Page() {
  // @ts-ignore Async server component
  return <ProductList />;
}

export default Page;
