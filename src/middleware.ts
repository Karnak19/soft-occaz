import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/', '/annonces', '/search', '/sign-in', '/sign-up', '/api/uploadthing', '/api/listings', '/api/webhook/users'],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
