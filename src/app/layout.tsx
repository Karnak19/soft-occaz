import '@uploadthing/react/styles.css';
import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import { Lato, Roboto } from 'next/font/google';

import { cn } from '$/utils/cn';

import Providers from './providers';
import { Header } from './Header';

const title = 'Airsoft Market';
const description =
  "Trouvez du matériel d'airsoft d'occasion de qualité sur Airsoft Market. Achetez et vendez des répliques, des accessoires et des équipements d'occasion pour vos parties d'airsoft.";

export const metadata = {
  title: { default: title, template: '%s | Airsoft Market' },
  description,
  openGraph: { title, description, images: ['https://airsoft-market.store/logo.png'] },
  twitter: { card: 'summary_large_image', title, description, images: ['https://airsoft-market.store/logo.png'] },
  icons: ['https://airsoft-market.store/logo.png'],
  metadataBase: new URL('https://airsoft-market.store'),
  manifest: 'https://airsoft-market.store/manifest.json',
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

export default function RootLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <html lang="en" className={cn(lato.variable, roboto.variable)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <ClerkProvider>
        <body className="bg-gray-100 font-lato text-sm text-slate-900 min-h-screen flex flex-col">
          <Providers>
            <Header />
            <main className="min-h-full flex-1">
              <>{modal}</>
              <>{children}</>
            </main>
            <footer className="bg-rg-100">
              <div className="lg:pl-52 mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                <div className="flex justify-center space-x-6 md:order-2"></div>
                <div className="mt-8 md:order-1 md:mt-0">
                  <p className="text-center text-xs leading-5 text-gray-500">&copy; 2023 Airsoft-market, All rights reserved.</p>
                </div>
              </div>
            </footer>
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
