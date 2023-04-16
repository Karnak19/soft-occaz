import '$/styles/globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import { type AppProps } from 'next/app';
import { Lato, Roboto } from 'next/font/google';
import Link from 'next/link';

import ClerkUserButton from '$/components/Clerk.UserButton';
import SearchForm from '$/components/SearchForm';
import { api } from '$/utils/api';
import { cn } from '$/utils/cn';

const lato = Lato({
  variable: '--font-lato',
  display: 'swap',
  weight: ['400', '700'],
  subsets: ['latin'],
});

const roboto = Roboto({
  variable: '--font-roboto',
  display: 'swap',
  weight: ['400', '700'],
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={cn(lato.variable, roboto.variable, 'min-h-screen bg-gray-100 text-gray-900')}>
      <ClerkProvider {...pageProps}>
        <header className="sticky top-0 z-20 bg-rg px-4 text-white shadow-black">
          <div className="grid grid-cols-3 gap-5 py-5 lg:px-10">
            <div className="col-span-2 flex items-center sm:col-span-1">
              <Link href="/">airsoft-market</Link>
            </div>
            <SearchForm />
            <ClerkUserButton />
          </div>
        </header>
        <Component {...pageProps} />
        <Analytics />
      </ClerkProvider>
    </div>
  );
}

export default api.withTRPC(MyApp);
