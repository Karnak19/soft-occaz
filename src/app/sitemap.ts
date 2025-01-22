import { type MetadataRoute } from 'next';

import { ListingsTypeOptions } from '$/utils/pocketbase/pocketbase-types';
import { createStaticClient } from '$/utils/pocketbase/static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pb = await createStaticClient();

  const BASE_URL = 'https://airsoftmarket.fr';

  const types = Object.values(ListingsTypeOptions).map((type) => {
    return { url: `${BASE_URL}/annonces/${type.toLowerCase()}`, lastModified: new Date() };
  });

  const annonces = await pb.collection('listings').getFullList({
    fields: 'id,updated',
  });

  const users = await pb.collection('users').getFullList({
    fields: 'id,updated',
  });

  return [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/sign-in`, lastModified: new Date() },
    { url: `${BASE_URL}/sign-up`, lastModified: new Date() },
    { url: `${BASE_URL}/annonces`, lastModified: new Date() },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date() },
    ...types,
    ...annonces.map((annonce) => ({
      url: `${BASE_URL}/annonces/details/${annonce.id}`,
      lastModified: annonce.updated,
    })),
    ...users.map((user) => ({
      url: `${BASE_URL}/profile/${user.id}`,
      lastModified: user.updated,
    })),
  ];
}
