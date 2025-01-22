export default function WebsiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Airsoft Market',
    alternateName: 'Airsoft Market - Annonces airsoft occasion',
    url: 'https://airsoftmarket.fr',
    description:
      "La première marketplace française dédiée à l'airsoft d'occasion. Achetez et vendez des répliques, accessoires et équipements d'airsoft d'occasion.",
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://airsoftmarket.fr/annonces?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'fr-FR',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
