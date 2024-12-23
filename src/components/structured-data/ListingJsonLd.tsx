import { Listing, User } from '@prisma/client';

type ListingJsonLdProps = {
  listing: Listing & { user: User };
};

export default function ListingJsonLd({ listing }: ListingJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: listing.title,
    description: listing.description,
    image: listing.images?.[0] || 'https://airsoft-market.store/logo.png',
    offers: {
      '@type': 'Offer',
      price: listing.price.toString(),
      priceCurrency: 'EUR',
      itemCondition: 'https://schema.org/UsedCondition',
      availability: listing.sold ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
      seller: {
        '@type': 'Person',
        name: listing.user.username || listing.user.firstName,
      },
    },
    category: listing.type,
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
