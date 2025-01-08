import FaqJsonLd from '$/components/structured-data/FaqJsonLd';
import { Card, CardContent, CardHeader, CardTitle } from '$/components/ui/card';
import { ListingsTypeOptions } from '$/utils/pocketbase/pocketbase-types';

type CategoryContentProps = {
  type: `${ListingsTypeOptions}`;
};

const categoryContent: Record<
  ListingsTypeOptions,
  {
    title: string;
    description: string;
    faqs: Array<{ question: string; answer: string }>;
  }
> = {
  aeg: {
    title: "Répliques AEG d'occasion - Airsoft électrique",
    description: `Les répliques AEG (Automatic Electric Gun) sont les plus populaires dans l'airsoft. Fiables et performantes, 
    elles offrent un excellent rapport qualité-prix. Découvrez notre sélection d'AEG d'occasion vérifiées par notre communauté.`,
    faqs: [
      {
        question: "Quels sont les avantages d'acheter une réplique AEG d'occasion ?",
        answer:
          "L'achat d'une réplique AEG d'occasion permet d'économiser significativement tout en bénéficiant souvent d'améliorations déjà installées. Les AEG sont robustes et gardent bien leur valeur dans le temps.",
      },
      {
        question: "Comment vérifier l'état d'une réplique AEG d'occasion ?",
        answer:
          "Vérifiez la compression, l'usure du hop-up, l'état de la batterie et testez la réplique si possible. Sur Airsoft Market, les vendeurs doivent fournir des photos détaillées et décrire précisément l'état de la réplique.",
      },
    ],
  },
  gbb: {
    title: "Pistolets GBB d'occasion - Airsoft Gas Blow Back",
    description: `Les pistolets GBB (Gas Blow Back) offrent un réalisme incomparable avec leur recul et leur fonctionnement au gaz. 
    Trouvez votre prochain pistolet GBB d'occasion parmi notre sélection vérifiée.`,
    faqs: [
      {
        question: "Quels points vérifier sur un GBB d'occasion ?",
        answer:
          "Vérifiez l'étanchéité des joints, l'état des chargeurs, et le fonctionnement du blow back. Les pièces mobiles doivent être en bon état et les chargeurs ne doivent pas fuir.",
      },
      {
        question: "Quelle maintenance pour un GBB d'occasion ?",
        answer:
          "Un GBB nécessite un entretien régulier : lubrification des joints, nettoyage après utilisation, et stockage approprié. Demandez au vendeur l'historique d'entretien de la réplique.",
      },
    ],
  },
  gbbr: {
    title: "Répliques GBBR d'occasion - Fusils à gaz",
    description: `Les GBBR (Gas Blow Back Rifle) sont prisés pour leur réalisme exceptionnel. 
    Découvrez notre sélection de GBBR d'occasion pour une expérience airsoft immersive.`,
    faqs: [
      {
        question: "Pourquoi choisir un GBBR d'occasion ?",
        answer:
          "Les GBBR d'occasion permettent d'accéder à des répliques haut de gamme à prix réduit. Leur construction robuste en fait d'excellents candidats pour le marché de l'occasion.",
      },
      {
        question: "Quels sont les points d'attention pour un GBBR d'occasion ?",
        answer:
          "Vérifiez l'état des joints, des chargeurs, et du système de blow back. La qualité des pièces internes et l'historique d'entretien sont cruciaux pour un GBBR.",
      },
    ],
  },
  hpa: {
    title: "Systèmes HPA d'occasion - High Pressure Air",
    description: `Les systèmes HPA offrent une performance et une fiabilité exceptionnelles. 
    Explorez notre sélection de répliques HPA d'occasion pour des performances optimales.`,
    faqs: [
      {
        question: "Quels avantages offre un système HPA d'occasion ?",
        answer:
          "Un système HPA d'occasion permet d'accéder à une technologie premium à moindre coût. La fiabilité et la constance des performances sont les principaux avantages.",
      },
      {
        question: "Comment évaluer un système HPA d'occasion ?",
        answer:
          "Vérifiez l'état du régulateur, des lignes d'air, et du FCU. Demandez des tests en conditions réelles et l'historique des maintenances.",
      },
    ],
  },
  ptw: {
    title: "Répliques PTW d'occasion - Professional Training Weapon",
    description: `Les PTW sont reconnues pour leur qualité de fabrication et leur précision exceptionnelle. 
    Trouvez votre PTW d'occasion parmi notre sélection premium.`,
    faqs: [
      {
        question: "Pourquoi investir dans un PTW d'occasion ?",
        answer:
          "Les PTW d'occasion offrent un excellent rapport qualité-prix pour des répliques haut de gamme. Leur construction robuste garantit une longue durée de vie.",
      },
      {
        question: "Que vérifier sur un PTW d'occasion ?",
        answer:
          'Examinez la mécanique interne, la qualité du hop-up, et les performances générales. Les PTW étant des répliques haut de gamme, une maintenance documentée est importante.',
      },
    ],
  },
  aep: {
    title: "Pistolets AEP d'occasion - Airsoft Electric Pistol",
    description: `Les AEP sont parfaits pour les joueurs cherchant une réplique de poing fiable par tous temps. 
    Découvrez notre sélection de pistolets électriques d'occasion.`,
    faqs: [
      {
        question: "Quels sont les avantages d'un AEP d'occasion ?",
        answer:
          "Les AEP d'occasion sont économiques et parfaits pour débuter. Leur fonctionnement électrique les rend fiables en toutes conditions.",
      },
      {
        question: "Comment choisir un AEP d'occasion ?",
        answer:
          "Vérifiez l'état de la batterie, du moteur et du hop-up. La fiabilité du système électrique est cruciale pour un AEP.",
      },
    ],
  },
  sniper: {
    title: "Sniper d'occasion - Répliques de précision",
    description: `Les répliques de sniper offrent précision et discrétion pour les joueurs tactiques. 
    Explorez notre sélection de snipers d'occasion pour vos parties longue distance.`,
    faqs: [
      {
        question: "Que rechercher dans un sniper d'occasion ?",
        answer:
          "Vérifiez la précision, l'état du canon et du hop-up. Les upgrades installés peuvent significativement augmenter la valeur de la réplique.",
      },
      {
        question: "Quelles sont les améliorations courantes sur un sniper d'occasion ?",
        answer:
          "Les snipers d'occasion ont souvent des améliorations comme un canon de précision, un joint hop-up amélioré, ou un ressort plus puissant.",
      },
    ],
  },
  gear: {
    title: "Équipement airsoft d'occasion - Gear et accessoires",
    description: `Trouvez tout l'équipement nécessaire pour votre pratique de l'airsoft. 
    Notre sélection d'équipements d'occasion comprend gilets, holsters, et accessoires.`,
    faqs: [
      {
        question: "Comment choisir son équipement d'occasion ?",
        answer:
          "Vérifiez l'état général, les coutures, et la fonctionnalité des systèmes de fixation. La qualité des matériaux est essentielle pour la durabilité.",
      },
      {
        question: 'Quels équipements privilégier en occasion ?',
        answer:
          "Les gilets tactiques, les holsters et les systèmes de portage sont d'excellents choix en occasion car ils sont robustes et gardent leur valeur.",
      },
    ],
  },
  other: {
    title: "Autres répliques et accessoires d'occasion",
    description: `Découvrez notre sélection d'articles d'occasion variés pour l'airsoft. 
    Des pièces détachées aux accessoires spéciaux, trouvez l'équipement qui vous manque.`,
    faqs: [
      {
        question: "Que trouve-t-on dans la catégorie 'Autres' ?",
        answer:
          'Cette catégorie regroupe les pièces détachées, les accessoires spéciaux, et les répliques qui ne rentrent pas dans les catégories standard.',
      },
      {
        question: "Comment évaluer ces articles d'occasion ?",
        answer:
          'Demandez des photos détaillées et des descriptions précises. La compatibilité avec votre équipement existant est un point important à vérifier.',
      },
    ],
  },
};

export default function CategoryContent({ type }: CategoryContentProps) {
  const content = categoryContent[type];

  return (
    <div className="mb-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{content.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{content.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Questions fréquentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.faqs.map((faq, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <FaqJsonLd faqs={content.faqs} />
    </div>
  );
}
