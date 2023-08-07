import { Type } from '@prisma/client';
import { type Metadata } from 'next';

import ProductList from '$/components/ProductList';

export const revalidate = 30;

// Type value lowercased as union
type _Type = Lowercase<Type>;

export async function generateMetadata({ params }: { params: { type: _Type } }): Promise<Metadata> {
  return {
    title: `Annonces ${params.type.toUpperCase()}`,
  };
}

async function page({ params }: { params: { type: _Type } }) {
  const getType = (type: _Type): Type => {
    switch (type) {
      case 'aeg':
      case 'aep':
      case 'gbbr':
      case 'gbb':
      case 'ptw':
      case 'hpa':
      case 'gear':
        return type.toUpperCase() as Type;
      case 'other':
        return 'Other';
      case 'sniper':
        return 'Sniper';
    }
  };

  // @ts-ignore Async server component
  return <ProductList filter={getType(params.type)} />;
}

export default page;
