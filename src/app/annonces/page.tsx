import ProductList from '$/components/ProductList';

export const revalidate = 30;
export const metadata = {
  title: 'Annonces',
  description: 'Toutes les annonces',
};

async function page() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Async server component
  return <ProductList />;
}

export default page;
