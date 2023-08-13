import { authMiddleware } from '@clerk/nextjs';

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
    '/api/uploadthing',
    '/api/listings',
    '/api/listings/search',
    '/api/users/:id/ratings',
    '/api/webhook/users',
    '/api/webhook/stripe',
    '/privacy-policy',
  ],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
