import { type Metadata } from 'next';

import ProductList from '$/app/annonces/products-list';
import AdSense from '$/components/AdSense';
import AnnoncesOccasionSeoSection from '$/components/annonces/AnnoncesOccasionSeoSection';
import CategoryContent from '$/components/category/CategoryContent';
import AnnoncesOccasionJsonLd from '$/components/structured-data/AnnoncesOccasionJsonLd';
import { ListingsTypeOptions } from '$/utils/pocketbase/pocketbase-types';

// Type value lowercased as union
type _Type = Lowercase<ListingsTypeOptions>;

const typeDescriptions: Record<ListingsTypeOptions, string> = {
  aeg: "Découvrez sur Airsoft Market notre sélection de répliques AEG d'occasion. Trouvez votre prochaine réplique électrique parmi nos annonces vérifiées d'airsoft d'occasion.",
  aep: "Pistolets électriques AEP d'occasion sur Airsoft Market. Fiables et économiques, parfaits pour débuter ou comme réplique de backup. Annonces d'airsoft d'occasion vérifiées.",
  gbb: "Explorez sur Airsoft Market nos pistolets GBB d'occasion. Large choix de répliques à gaz de qualité à prix attractifs. Meilleures annonces d'airsoft d'occasion.",
  gbbr: "Achetez sur Airsoft Market votre GBBR d'occasion. Répliques à gaz réalistes et performantes sélectionnées avec soin. Airsoft d'occasion de qualité garantie.",
  hpa: "Trouvez sur Airsoft Market votre système HPA d'occasion. Performance et fiabilité garanties pour vos parties d'airsoft. Annonces d'airsoft d'occasion premium.",
  ptw: "Répliques PTW d'occasion premium sur Airsoft Market. Découvrez notre sélection de Professional Training Weapons. Airsoft d'occasion haut de gamme.",
  shotgun:
    "Répliques de fusils à pompe d'occasion sur Airsoft Market. Fiables et performantes, idéales pour les parties d'airsoft. Annonces d'airsoft d'occasion vérifiées.",
  sniper:
    "Répliques sniper d'occasion pour l'airsoft sur Airsoft Market. Précision et discrétion à prix attractif. Meilleures annonces d'airsoft d'occasion pour tireurs d'élite.",
  gear: "Équipement airsoft d'occasion sur Airsoft Market. Gilets, holsters, et accessoires sélectionnés pour leur qualité. Annonces d'airsoft d'occasion pour compléter votre loadout.",
  other:
    "Autres répliques et accessoires d'airsoft d'occasion sur Airsoft Market. Trouvez la pièce rare qu'il vous manque. Annonces d'airsoft d'occasion diverses et variées.",
};

export async function generateMetadata(props: { params: Promise<{ type?: _Type[] }> }): Promise<Metadata> {
  const params = await props.params;
  const type = params.type?.[0];

  const title = type
    ? `${type.toUpperCase()} d'Occasion sur Airsoft Market | Annonces d'Airsoft d'Occasion`
    : "Annonces d'Airsoft d'Occasion sur Airsoft Market";
  const description = type
    ? typeDescriptions[type]
    : "Découvrez sur Airsoft Market notre sélection de répliques et accessoires d'airsoft d'occasion. Trouvez la pièce rare qu'il vous manque parmi nos annonces d'airsoft d'occasion vérifiées.";

  return {
    title,
    description,
    keywords: `airsoft occasion, ${type || ''} occasion, annonce airsoft occasion, réplique airsoft occasion, vente airsoft occasion, achat airsoft occasion, airsoft market`,
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

export const dynamic = 'force-static';
async function page(props: {
  params: Promise<{ type?: _Type[] }>;
}) {
  const params = await props.params;
  const type = params.type?.[0];

  return (
    <>
      {!type && (
        <>
          <AnnoncesOccasionJsonLd />
          <AnnoncesOccasionSeoSection />
        </>
      )}

      {/* AdSense - Before Product List */}
      <div className="my-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="mb-2 text-xs text-muted-foreground text-center">Publicité</div>
            <AdSense slot="7936657118" format="auto" className="min-h-[200px]" />
          </div>
        </div>
      </div>

      {/* @ts-ignore Async server component */}
      <ProductList />

      {/* AdSense - Between Product List and Category Content (only for specific types) */}
      {type && (
        <div className="my-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-lg border border-border bg-muted/30 p-6">
              <div className="mb-4 text-xs text-muted-foreground text-center">Publicité</div>
              <AdSense slot="3011633493" format="auto" className="min-h-[280px]" />
            </div>
          </div>
        </div>
      )}

      {type && <CategoryContent type={type} />}
    </>
  );
}

export default page;
