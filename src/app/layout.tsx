import '@uploadthing/react/styles.css';
import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import { Lato, Roboto } from 'next/font/google';
import Link from 'next/link';

import SearchForm from '$/components/SearchForm';
import UserPanel from '$/components/UserPanel';
import { cn } from '$/utils/cn';

import Providers from './providers';

export const metadata = {
  title: {
    default: 'Airsoft Market',
    template: '%s | Airsoft Market',
  },
  description: "Le marché en ligne d'airsoft d'occasion par excellence.",
};

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(lato.variable, roboto.variable)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <ClerkProvider>
        <body className="bg-gray-100 font-lato text-sm text-slate-900 min-h-screen">
          <Providers>
            <header className="sticky top-0 z-20 bg-rg px-4 text-white shadow-black">
              <div className="grid grid-cols-3 gap-5 py-5 lg:px-10">
                <div className="col-span-2 flex items-center sm:col-span-1">
                  <Link href="/">airsoft-market</Link>
                </div>
                <SearchForm />
                <UserPanel />
              </div>
            </header>
            <main className="min-h-full">
              <>{children}</>
            </main>
          </Providers>
          <Analytics />
          {/* <Script
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7044834303541905"
          crossOrigin="anonymous"
        /> */}
        </body>
      </ClerkProvider>
    </html>
  );
}
