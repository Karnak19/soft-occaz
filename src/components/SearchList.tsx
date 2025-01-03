import { Collections, ListingsResponse, ListingsTypeOptions, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { createServerClient } from '$/utils/pocketbase/server';

import ProductCard from './product/ProductCard';

async function SearchList({ searchParams }: { searchParams: { q: string } }) {
  const pb = await createServerClient();

  const filter = getFilter(searchParams.q);

  const data = await pb.collection(Collections.Listings).getFullList<ListingsResponse<string[], { user: UsersResponse }>>({
    filter,
    expand: 'user',
  });

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
            <ProductCard {...ad} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function getFilter(q: string) {
  const words = q.split(' ');
  const types = Object.values(ListingsTypeOptions);

  const typesFilter = types.length > 0 ? types.map((type) => `type = "${type}"`).join(' || ') : '';
  const wordsFilter = words.length > 0 ? words.map((word) => `title ~ "${word}"`).join(' || ') : '';
  return [typesFilter, wordsFilter].filter(Boolean).join(' && ');
}

export default SearchList;
