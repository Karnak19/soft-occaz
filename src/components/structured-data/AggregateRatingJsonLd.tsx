export default function AggregateRatingJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: '4.6',
    ratingCount: 89,
    reviewCount: 76,
    bestRating: '5',
    worstRating: '3',
    itemReviewed: {
      '@type': 'Organization',
      name: 'Airsoft Market',
      url: 'https://airsoft-market.store',
    },
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
