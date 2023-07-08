import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/annonces',
    '/annonces/:type',
    '/search',
    '/sign-in',
    '/sign-up',
    '/api/uploadthing',
    '/api/listings',
    '/api/webhook/users',
    '/privacy-policy'
  ],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
