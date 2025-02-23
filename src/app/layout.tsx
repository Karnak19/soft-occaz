import './globals.css';

import { SpeedInsights } from '@vercel/speed-insights/next';
import PlausibleProvider from 'next-plausible';
import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster as SonnerToaster } from 'sonner';

import CookieConsent from '$/components/CookieConsent';
import { AppSidebar } from '$/components/app-sidebar';
import { AppSidebarTrigger } from '$/components/app-sidebar-trigger';
import WebsiteJsonLd from '$/components/structured-data/WebsiteJsonLd';
import { Toaster } from '$/components/ui/toaster';
import { cn } from '$/utils/cn';
import { createServerClient } from '$/utils/pocketbase/server';

import AggregateRatingJsonLd from '$/components/structured-data/AggregateRatingJsonLd';
import { SidebarInset } from '$/components/ui/sidebar';
import Footer from './Footer';
import Providers from './providers';

const title = "Airsoft occasion - Annonces airsoft d'occasion | Airsoft Market";
const description =
  "La première marketplace française dédiée à l'airsoft d'occasion. ✓ Répliques d'occasion ✓ Accessoires ✓ Équipements. Achetez et vendez en toute sécurité sur Airsoft Market.";

export const metadata = {
  title: { default: title, template: '%s | Airsoft Market - Occasion' },
  description,
  openGraph: {
    title,
    description,
    images: ['https://airsoftmarket.fr/screenshot-annonces.jpg'],
    locale: 'fr_FR',
    type: 'website',
    siteName: 'Airsoft Market',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['https://airsoftmarket.fr/screenshot-annonces.jpg'],
  },
  icons: ['https://airsoftmarket.fr/logo.png'],
  metadataBase: new URL('https://airsoftmarket.fr'),
  manifest: 'https://airsoftmarket.fr/manifest.json',
  alternates: {
    canonical: 'https://airsoftmarket.fr',
  },
  keywords:
    "airsoft occasion, airsoft d'occasion, replique airsoft occasion, equipement airsoft occasion, vente airsoft occasion, achat airsoft occasion, annonce airsoft, marketplace airsoft",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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

export default async function RootLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  const client = await createServerClient();

  return (
    <html lang="fr" className={cn(roboto.variable, velas.variable)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, interactive-widget=resizes-content" />
        <meta name="google-adsense-account" content="ca-pub-7044834303541905" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="alternate" hrefLang="fr" href="https://airsoftmarket.fr" />
        <link rel="alternate" hrefLang="x-default" href="https://airsoftmarket.fr" />

        <PlausibleProvider domain="airsoftmarket.fr" selfHosted />
        <WebsiteJsonLd />
        <AggregateRatingJsonLd />
      </head>
      <body className="min-h-screen bg-background font-brand text-sm text-foreground">
        <NextTopLoader color={'hsl( var(--primary) )'} />
        <Providers initialToken={client.authStore.token} initialUser={client.authStore.record}>
          <NuqsAdapter>
            <AppSidebar />
            <SidebarInset>
              <AppSidebarTrigger />
              <main className="flex-1">
                {modal}
                {children}
              </main>
              <Footer />
            </SidebarInset>
          </NuqsAdapter>
        </Providers>
        <SpeedInsights />
        <Toaster />
        <SonnerToaster richColors />
        <CookieConsent />
      </body>
    </html>
  );
}
