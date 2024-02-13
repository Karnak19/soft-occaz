import React from 'react';
import { Prisma } from '@prisma/client';

import ProductCard from '$/components/product/ProductCard';

export function ProductListGrid({
  annonces,
}: {
  annonces: Prisma.ListingGetPayload<{
    include: { user: { include: { ratings: true } } };
  }>[];
}) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(theme(width.60),1fr))] gap-6">
      {annonces.map((props) => (
        <li key={props.id}>
          <ProductCard
            {...{ href: `/annonces/details/${props.id}`, ...props }}
            isHighlighted={['hobby', 'geardo', 'premium'].includes(props.user.sub?.toLowerCase() ?? '')}
          />
        </li>
      ))}
    </ul>
  );
}
