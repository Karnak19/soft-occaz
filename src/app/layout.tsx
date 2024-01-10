import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';

import { cn } from '$/utils/cn';

import Providers from './providers';
import Sidebar from './annonces/Sidebar';

const title = 'Airsoft occasions - Airsoft Market';
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
const velas = localFont({
  variable: '--font-velas',
  src: [
    {
      path: './fonts/VelaSans-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/VelaSans-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/VelaSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/VelaSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/VelaSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/VelaSans-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/VelaSans-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  display: 'swap',
});

const roboto = Roboto({
  variable: '--font-roboto',
  display: 'swap',
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function RootLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <html lang="en" className={cn(roboto.variable, velas.variable)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body className="bg-background font-lato text-sm text-foreground min-h-screen flex flex-col">
        <Providers>
          <main className="min-h-full flex-1">
            <>{modal}</>
            <Sidebar>{children}</Sidebar>
          </main>
          <footer className="bg-rg-100 dark:bg-muted">
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
    </html>
  );
}
