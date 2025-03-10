import Link from 'next/link';
import { Button } from '../ui/button';

export default function AirsoftOccasionSeoSection() {
  return (
    <section className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Airsoft Market - La Référence des Annonces d'Airsoft d'Occasion</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-center mb-4">
          Bienvenue sur <strong>Airsoft Market</strong>, la première marketplace française entièrement dédiée à l'
          <strong>airsoft d'occasion</strong>.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div>
            <h2 className="text-xl font-semibold mb-3">Pourquoi choisir Airsoft Market pour l'airsoft d'occasion ?</h2>
            <p>
              L'<strong>airsoft d'occasion</strong> sur <strong>Airsoft Market</strong> est une solution économique et écologique
              pour les passionnés. Nos annonces d'<strong>airsoft d'occasion</strong> vous permettent d'accéder à du matériel de
              qualité à prix réduit, vérifié par notre communauté et notre équipe.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3">Notre sélection d'airsoft d'occasion</h2>
            <p>
              Découvrez sur <strong>Airsoft Market</strong> notre large catalogue d'<strong>annonces d'airsoft d'occasion</strong>{' '}
              : répliques AEG, GBB, snipers, équipements et accessoires. Chaque annonce est vérifiée pour garantir des
              transactions en toute sécurité.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <Button asChild>
          <Link href="/airsoft-occasion">En savoir plus sur l'airsoft d'occasion</Link>
        </Button>
      </div>
    </section>
  );
}
