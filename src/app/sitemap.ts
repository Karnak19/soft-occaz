import { type MetadataRoute } from 'next';

import { getBlogPosts } from '$/services/blog';
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

  const allBlogPosts = await getBlogPosts(1, 9999);
  const blogPostUrls = allBlogPosts.items.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated),
  }));

  return [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/airsoft-occasion`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/sign-in`, lastModified: new Date() },
    { url: `${BASE_URL}/sign-up`, lastModified: new Date() },
    { url: `${BASE_URL}/annonces`, lastModified: new Date() },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date() },
    ...types,
    ...annonces.map((annonce) => ({
      url: `${BASE_URL}/annonces/details/${annonce.id}`,
      lastModified: new Date(annonce.updated),
    })),
    ...users.map((user) => ({
      url: `${BASE_URL}/profile/${user.id}`,
      lastModified: new Date(user.updated),
    })),
    ...blogPostUrls,
  ];
}
