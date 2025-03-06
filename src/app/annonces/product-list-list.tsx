import ProductWideCard, { FakeLoadingProductWideCardList } from '$/components/product/ProductWideCard';
import { ListingsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';

export function ProductListList({ annonces }: { annonces: ListingsResponse<string[], { user: UsersResponse }>[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {annonces.map((annonce) => (
        <li key={annonce.id}>
          <ProductWideCard {...annonce} />
        </li>
      ))}
    </ul>
  );
}

export function ProductListListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <ul className="flex flex-col gap-4">
      <FakeLoadingProductWideCardList count={count} />
    </ul>
  );
}
