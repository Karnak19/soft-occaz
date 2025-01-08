import ProductCard from '$/components/product/ProductCard';
import { ListingsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';

export function ProductListGrid({ annonces }: { annonces: ListingsResponse<string[], { user: UsersResponse }>[] }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(theme(width.60),1fr))] gap-6">
      {annonces.map((props) => (
        <li key={props.id}>
          <ProductCard {...props} />
        </li>
      ))}
    </ul>
  );
}
