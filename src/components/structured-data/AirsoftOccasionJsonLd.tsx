export default function AirsoftOccasionJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: "Airsoft d'Occasion sur Airsoft Market | La Marketplace d'Airsoft d'Occasion",
          description:
            "Découvrez Airsoft Market, la référence française de l'airsoft d'occasion. Achetez et vendez des répliques d'airsoft d'occasion, équipements et accessoires en toute sécurité.",
          url: 'https://airsoftmarket.fr/airsoft-occasion',
          mainEntity: {
            '@type': 'ItemList',
            name: "Catégories d'Airsoft d'Occasion sur Airsoft Market",
            description: "Découvrez toutes les catégories d'airsoft d'occasion disponibles sur Airsoft Market",
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: "Répliques AEG d'occasion",
                url: 'https://airsoftmarket.fr/annonces/aeg',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: "Pistolets GBB d'occasion",
                url: 'https://airsoftmarket.fr/annonces/gbb',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: "Répliques sniper d'occasion",
                url: 'https://airsoftmarket.fr/annonces/sniper',
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: "Équipements d'airsoft d'occasion",
                url: 'https://airsoftmarket.fr/annonces/gear',
              },
            ],
          },
          publisher: {
            '@type': 'Organization',
            name: 'Airsoft Market',
            logo: {
              '@type': 'ImageObject',
              url: 'https://airsoftmarket.fr/logo.png',
            },
          },
        }),
      }}
    />
  );
}
