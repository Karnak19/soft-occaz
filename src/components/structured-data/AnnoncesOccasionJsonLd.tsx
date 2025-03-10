export default function AnnoncesOccasionJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: "Annonces d'Airsoft d'Occasion sur Airsoft Market",
          description:
            "Découvrez sur Airsoft Market notre sélection de répliques et accessoires d'airsoft d'occasion. Trouvez la pièce rare qu'il vous manque parmi nos annonces d'airsoft d'occasion vérifiées.",
          url: 'https://airsoftmarket.fr/annonces',
          mainEntity: {
            '@type': 'ItemList',
            name: "Catégories d'Annonces d'Airsoft d'Occasion",
            description: "Parcourez les différentes catégories d'annonces d'airsoft d'occasion sur Airsoft Market",
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
