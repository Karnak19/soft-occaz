import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/dashboard/', '/sign-in/', '/sign-up/', '/profile/*/edit', '/annonces/create'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 2,
      },
    ],
    sitemap: 'https://airsoft-market.store/sitemap.xml',
    host: 'https://airsoft-market.store',
  };
}
