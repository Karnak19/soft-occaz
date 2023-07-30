import ProductCard from './product/ProductCard';
import { getSearch } from '$/app/api/listings/search/getSearch';

async function SearchList({ searchParams }: { searchParams: { q: string } }) {
  console.log(searchParams);

  const data = await getSearch(searchParams.q);

  // const res = await fetch(`/api/listings/search?q=${searchParams.q}`);
  // const data = (await res.json()) as Listing[];

  return (
    <div className="mx-auto w-1080 px-2">
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
