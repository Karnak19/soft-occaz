import { getSearch } from '$/app/api/listings/search/getSearch';

import ProductCard from './product/ProductCard';

async function SearchList({ searchParams }: { searchParams: { q: string } }) {
  const data = await getSearch(searchParams.q);

  return (
    <div className="container mx-auto px-2">
      <header className="py-4">
        <p className="text-lg italic">
          {data?.length} résultats pour « {searchParams.q} »
        </p>
      </header>

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(theme(width.60),1fr))] gap-8">
        {data?.map((ad) => (
          <li key={ad.id}>
            <ProductCard
              {...{
                href: `/annonces/details/${ad.id}`,
                ...ad,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchList;
