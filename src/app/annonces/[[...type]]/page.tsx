import { type Metadata } from 'next';

import ProductList from '$/app/annonces/products-list-rsc';
import CategoryContent from '$/components/category/CategoryContent';
import { ListingsTypeOptions } from '$/utils/pocketbase/pocketbase-types';

// Type value lowercased as union
type _Type = Lowercase<ListingsTypeOptions>;

const typeDescriptions: Record<ListingsTypeOptions, string> = {
  aeg: "Découvrez notre sélection de répliques AEG d'occasion. Trouvez votre prochaine réplique électrique parmi nos annonces vérifiées.",
  aep: "Pistolets électriques AEP d'occasion. Fiables et économiques, parfaits pour débuter ou comme réplique de backup.",
  gbb: "Explorez nos pistolets GBB d'occasion. Large choix de répliques à gaz de qualité à prix attractifs.",
  gbbr: "Achetez votre GBBR d'occasion. Répliques à gaz réalistes et performantes sélectionnées avec soin.",
  hpa: "Trouvez votre système HPA d'occasion. Performance et fiabilité garanties pour vos parties d'airsoft.",
  ptw: "Répliques PTW d'occasion premium. Découvrez notre sélection de Professional Training Weapons.",
  shotgun: "Répliques de fusils à pompe d'occasion. Fiables et performantes, idéales pour les parties d'airsoft.",
  sniper: "Répliques sniper d'occasion pour l'airsoft. Précision et discrétion à prix attractif.",
  gear: "Équipement airsoft d'occasion. Gilets, holsters, et accessoires sélectionnés pour leur qualité.",
  other: "Autres répliques et accessoires d'airsoft d'occasion. Trouvez la pièce rare qu'il vous manque.",
};

export async function generateMetadata({ params }: { params: { type?: _Type[] } }): Promise<Metadata> {
  const type = params.type?.[0];

  const title = type ? `${type.toUpperCase()} | Annonces` : 'Annonces';
  const description = type
    ? typeDescriptions[type]
    : "Découvrez notre sélection de répliques et accessoires d'airsoft d'occasion. Trouvez la pièce rare qu'il vous manque.";

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
      canonical: `https://airsoftmarket.fr/annonces/${params.type}`,
    },
  };
}

async function page({
  params,
  searchParams,
}: {
  params: { type?: _Type[] };
  searchParams?: { min: string; max: string; q: string; layout: 'list' | 'grid' };
}) {
  const type = params.type?.[0];

  return (
    <>
      {/* @ts-ignore Async server component */}
      <ProductList searchParams={searchParams} filter={type ?? undefined} />
      {type && <CategoryContent type={type} />}
    </>
  );
}

export default page;
