import { type Metadata } from 'next';
import Link from 'next/link';

import AirsoftOccasionJsonLd from '$/components/structured-data/AirsoftOccasionJsonLd';
import { Button } from '$/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$/components/ui/card';
import { ListingsTypeOptions } from '$/utils/pocketbase/pocketbase-types';

export const metadata: Metadata = {
  title: "Airsoft d'Occasion sur Airsoft Market | La Marketplace d'Airsoft d'Occasion",
  description:
    "Découvrez Airsoft Market, la référence française de l'airsoft d'occasion. Achetez et vendez des répliques d'airsoft d'occasion, équipements et accessoires en toute sécurité. Annonces vérifiées et transactions sécurisées.",
  keywords:
    "airsoft occasion, annonce airsoft occasion, réplique airsoft occasion, équipement airsoft occasion, vente airsoft occasion, achat airsoft occasion, marketplace airsoft, airsoft d'occasion, airsoft pas cher, airsoft market",
  alternates: {
    canonical: 'https://airsoftmarket.fr/airsoft-occasion',
  },
  openGraph: {
    title: "Airsoft d'Occasion sur Airsoft Market | La Marketplace d'Airsoft d'Occasion",
    description:
      "Découvrez Airsoft Market, la référence française de l'airsoft d'occasion. Achetez et vendez des répliques d'airsoft d'occasion, équipements et accessoires en toute sécurité.",
    url: 'https://airsoftmarket.fr/airsoft-occasion',
    type: 'website',
  },
};

export default function AirsoftOccasionPage() {
  return (
    <>
      <AirsoftOccasionJsonLd />
      <div className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-center mb-6">Airsoft Market - La Référence des Annonces d'Airsoft d'Occasion</h1>
          <p className="text-xl text-center mb-8">
            Bienvenue sur <strong>Airsoft Market</strong>, la première marketplace française entièrement dédiée à l'
            <strong>airsoft d'occasion</strong>.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Pourquoi choisir Airsoft Market pour l'airsoft d'occasion ?</h2>
              <p>
                Sur <strong>Airsoft Market</strong>, l'<strong>airsoft d'occasion</strong> est une solution économique et
                écologique pour tous les passionnés d'airsoft. En optant pour des répliques et équipements d'occasion, vous
                bénéficiez de plusieurs avantages :
              </p>
              <ul>
                <li>
                  <strong>Économies substantielles</strong> : Les répliques d'<strong>airsoft d'occasion</strong> sont
                  généralement proposées à 30-50% de leur prix neuf
                </li>
                <li>
                  <strong>Accès à des modèles rares</strong> : Trouvez des répliques qui ne sont plus commercialisées
                </li>
                <li>
                  <strong>Équipement déjà rodé</strong> : Profitez de répliques déjà testées et souvent améliorées
                </li>
                <li>
                  <strong>Démarche écologique</strong> : Donnez une seconde vie à du matériel de qualité
                </li>
              </ul>
              <p>
                Sur <strong>Airsoft Market</strong>, toutes nos <strong>annonces d'airsoft d'occasion</strong> sont vérifiées pour
                garantir des transactions en toute sécurité.
              </p>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Notre sélection d'airsoft d'occasion sur Airsoft Market</h2>
              <p>
                Découvrez notre large catalogue d'<strong>annonces d'airsoft d'occasion</strong> couvrant tous les types de
                répliques et d'équipements :
              </p>
              <ul>
                <li>
                  <strong>Répliques AEG d'occasion</strong> : M4, AK, SCAR, et bien d'autres modèles électriques
                </li>
                <li>
                  <strong>GBB et GBBR d'occasion</strong> : Pistolets et répliques longues à gaz pour plus de réalisme
                </li>
                <li>
                  <strong>Sniper d'occasion</strong> : Pour les tireurs d'élite recherchant précision et discrétion
                </li>
                <li>
                  <strong>Équipements d'occasion</strong> : Gilets, holsters, casques, et accessoires divers
                </li>
              </ul>
              <p>
                Chaque annonce sur <strong>Airsoft Market</strong> est vérifiée par notre équipe pour garantir la qualité des
                produits proposés et la sécurité des transactions.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Catégories d'Airsoft d'Occasion sur Airsoft Market</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(ListingsTypeOptions).map((type) => (
              <Card key={type} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{type.toUpperCase()} d'Occasion</CardTitle>
                  <CardDescription>Annonces vérifiées sur Airsoft Market</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Découvrez nos annonces de {type.toUpperCase()} d'occasion à prix attractifs.</p>
                  <Button asChild className="w-full">
                    <Link href={`/annonces/${type.toLowerCase()}`}>Voir les annonces {type.toUpperCase()}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Pourquoi Airsoft Market pour vos achats d'airsoft d'occasion ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Sécurité garantie</h3>
              <p>
                Toutes nos annonces d'<strong>airsoft d'occasion</strong> sont vérifiées. Nous assurons un suivi des transactions
                pour garantir votre sécurité.
              </p>
            </div>
            <div className="text-center p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Communauté active</h3>
              <p>
                Rejoignez la communauté <strong>Airsoft Market</strong> de passionnés d'airsoft qui partagent leurs expériences et
                conseils sur l'<strong>airsoft d'occasion</strong>.
              </p>
            </div>
            <div className="text-center p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Plateforme spécialisée</h3>
              <p>
                Contrairement aux sites généralistes, <strong>Airsoft Market</strong> est 100% dédié à l'
                <strong>airsoft d'occasion</strong>, avec des fonctionnalités adaptées à ce marché spécifique.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">FAQ sur l'Airsoft d'Occasion</h2>
          <div className="space-y-6">
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Comment vérifier l'état d'une réplique d'airsoft d'occasion ?</h3>
              <p>
                Examinez attentivement les photos, demandez des vidéos de fonctionnement, et n'hésitez pas à poser des questions
                précises sur l'historique et l'entretien de la réplique. Sur <strong>Airsoft Market</strong>, nous encourageons
                les vendeurs à fournir des descriptions détaillées de leurs <strong>annonces d'airsoft d'occasion</strong>.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">
                Quels sont les avantages d'acheter une réplique d'airsoft d'occasion ?
              </h3>
              <p>
                Les répliques d'<strong>airsoft d'occasion</strong> sur <strong>Airsoft Market</strong> sont généralement moins
                chères, parfois déjà upgradées, et vous permettent d'accéder à des modèles rares ou limités. C'est aussi une
                démarche plus écologique.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Comment vendre mon équipement d'airsoft d'occasion ?</h3>
              <p>
                Créez un compte sur <strong>Airsoft Market</strong>, prenez des photos de qualité de votre équipement, rédigez une
                description détaillée et honnête, fixez un prix compétitif, et publiez votre{' '}
                <strong>annonce d'airsoft d'occasion</strong>. Notre plateforme vous mettra en relation avec des acheteurs
                potentiels.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">
              Prêt à découvrir les meilleures annonces d'airsoft d'occasion sur Airsoft Market ?
            </h2>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button asChild size="lg">
                <Link href="/annonces">Voir toutes les annonces</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/sign-up">Créer un compte</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
