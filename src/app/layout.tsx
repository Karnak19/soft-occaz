import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import dynamic from 'next/dynamic';
import { Lato, Roboto } from 'next/font/google';
import Link from 'next/link';

import Navbar from '$/components/Navbar';
import UserPanel from '$/components/UserPanel';
import { cn } from '$/utils/cn';

import Providers from './providers';

const Warning = dynamic(() => import('$/components/home/Warning'), { ssr: false });

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
    <html lang="en" className={cn(lato.variable, roboto.variable, 'dark')}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-slate-900 text-slate-300 font-lato">
        <Providers>
          <header className="sticky top-0 z-20 shadow bg-slate-900 shadow-slate-800">
            <div className="flex items-end gap-5 py-5 text-2xl lg:px-10 text-slate-50">
              <div className="flex-1">
                <ul className="flex gap-5">
                  <li>
                    <Link href="/">airsoft-market</Link>
                  </li>
                </ul>
              </div>
              <UserPanel />
            </div>
            <div className="lg:px-20">
              <Navbar />
            </div>
          </header>
          <main className="w-[min(100%,1080px)] mx-auto mt-10">
            <Warning />
            <>{children}</>
          </main>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
