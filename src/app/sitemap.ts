import { Type } from '@prisma/client';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = 'https://airsoft-market.store';

  const types = Object.values(Type).map((type) => {
    return { url: `${BASE_URL}/annonces/${type.toLowerCase()}`, lastModified: new Date() };
  });

  return [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/sign-in`, lastModified: new Date() },
    { url: `${BASE_URL}/sign-up`, lastModified: new Date() },
    { url: `${BASE_URL}/annonces`, lastModified: new Date() },
    ...types,
  ];
}
