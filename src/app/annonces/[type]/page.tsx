import { type Metadata } from 'next';
import { Type } from '@prisma/client';

import CategoryContent from '$/components/category/CategoryContent';
import ProductList from '$/app/annonces/products-list-rsc';

export const revalidate = 180;

// Type value lowercased as union
type _Type = Lowercase<Type>;

const typeDescriptions: Record<Type, string> = {
  AEG: "Découvrez notre sélection de répliques AEG d'occasion. Trouvez votre prochaine réplique électrique parmi nos annonces vérifiées.",
  GBB: "Explorez nos pistolets GBB d'occasion. Large choix de répliques à gaz de qualité à prix attractifs.",
  GBBR: "Achetez votre GBBR d'occasion. Répliques à gaz réalistes et performantes sélectionnées avec soin.",
  HPA: "Trouvez votre système HPA d'occasion. Performance et fiabilité garanties pour vos parties d'airsoft.",
  PTW: "Répliques PTW d'occasion premium. Découvrez notre sélection de Professional Training Weapons.",
  AEP: "Pistolets électriques AEP d'occasion. Fiables et économiques, parfaits pour débuter ou comme réplique de backup.",
  Sniper: "Répliques sniper d'occasion pour l'airsoft. Précision et discrétion à prix attractif.",
  GEAR: "Équipement airsoft d'occasion. Gilets, holsters, et accessoires sélectionnés pour leur qualité.",
  Other: "Autres répliques et accessoires d'airsoft d'occasion. Trouvez la pièce rare qu'il vous manque.",
};

export async function generateMetadata({ params }: { params: { type: _Type } }): Promise<Metadata> {
  const type = getType(params.type);
  const title = `${typeDescriptions[type].split('.')[0]} | Airsoft Market`;
  const description = typeDescriptions[type];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'fr_FR',
    },
    alternates: {
      canonical: `https://airsoft-market.store/annonces/${params.type}`,
    },
  };
}

function getType(type: _Type): Type {
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
}

async function page({ params, searchParams }: { params: { type: _Type }; searchParams?: { min: string; max: string } }) {
  const type = getType(params.type);

  return (
    <>
      <CategoryContent type={type} />
      {/* @ts-ignore Async server component */}
      <ProductList searchParams={searchParams} filter={type} />
    </>
  );
}

export default page;
