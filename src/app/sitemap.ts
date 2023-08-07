import { prisma } from '$/utils/db';
import { Type } from '@prisma/client';
import { type MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = 'https://airsoft-market.store';

  const types = Object.values(Type).map((type) => {
    return { url: `${BASE_URL}/annonces/${type.toLowerCase()}`, lastModified: new Date() };
  });

  const annonces = await prisma.listing.findMany({
    select: { id: true, updatedAt: true },
    where: { sold: false },
  });

  const users = await prisma.user.findMany({
    select: { id: true, updatedAt: true },
  });

  return [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/sign-in`, lastModified: new Date() },
    { url: `${BASE_URL}/sign-up`, lastModified: new Date() },
    { url: `${BASE_URL}/annonces`, lastModified: new Date() },
    { url: `${BASE_URL}/search`, lastModified: new Date() },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date() },
    { url: `${BASE_URL}/pricing`, lastModified: new Date() },
    ...types,
    ...annonces.map((annonce) => ({
      url: `${BASE_URL}/annonces/details/${annonce.id}`,
      lastModified: annonce.updatedAt,
    })),
    ...users.map((user) => ({
      url: `${BASE_URL}/profile/${user.id}`,
      lastModified: user.updatedAt,
    })),
  ];
}
