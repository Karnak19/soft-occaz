import './globals.css';

import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';
import { ClerkProvider } from '@clerk/nextjs';
import { SpeedInsights } from '@vercel/speed-insights/next';
import PlausibleProvider from 'next-plausible';
import NextTopLoader from 'nextjs-toploader';

import { cn } from '$/utils/cn';
import { Toaster } from '$/components/ui/toaster';

import Footer from './Footer';
import Providers from './providers';
import Sidebar from './Sidebar';

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

        <PlausibleProvider domain="airsoft-market.store" customDomain="https://plausible.airsoft-market.store" />
      </head>
      <ClerkProvider>
        <body className="flex min-h-screen flex-col bg-background font-lato text-sm text-foreground">
          <NextTopLoader color={'hsl( var(--primary) )'} />
          <Providers>
            <main className="min-h-full flex-1">
              <>{modal}</>
              <Sidebar>{children}</Sidebar>
            </main>
            <Footer />
          </Providers>
          <SpeedInsights />
          {/* <Script
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7044834303541905"
          crossOrigin="anonymous"
        /> */}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
