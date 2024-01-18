import { authMiddleware } from '@clerk/nextjs/server';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/annonces',
    '/annonces/:type',
    '/annonces/details/:id',
    '/profile/:userId',
    '/pricing',
    '/search',
    '/sign-in',
    '/sign-up',
    '/api/listings',
    '/api/listings/:id',
    '/api/listings/:id/view',
    '/api/listings/search',
    '/api/users/:id/ratings',
    '/api/webhook/users',
    '/api/webhook/stripe',
    '/api/cron/history',
    '/api/cron/chats',
    '/privacy-policy',
    '/_vercel/speed-insights/vitals',
  ],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
