import { Type } from '@prisma/client';

type BreadcrumbItem = {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
};

type BreadcrumbJsonLdProps = {
  type?: Type;
  title?: string;
};

export default function BreadcrumbJsonLd({ type, title }: BreadcrumbJsonLdProps) {
  const items: BreadcrumbItem[] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Accueil',
      item: 'https://airsoft-market.store',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Annonces',
      item: 'https://airsoft-market.store/annonces',
    },
  ];

  if (type) {
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: type.toLowerCase(),
      item: `https://airsoft-market.store/annonces/${type.toLowerCase()}`,
    });
  }

  if (title) {
    items.push({
      '@type': 'ListItem',
      position: items.length + 1,
      name: title,
    });
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
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