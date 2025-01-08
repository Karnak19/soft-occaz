'use client';

import { getCookie, setCookie } from 'cookies-next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = getCookie('cookie-consent');
    if (!hasConsented) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    setCookie('cookie-consent', 'accepted', { maxAge: 365 * 24 * 60 * 60 }); // 1 year
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 text-sm text-muted-foreground">
          <p>
            Nous utilisons des cookies essentiels pour le fonctionnement du site. Nos outils d&apos;analyse (Plausible et Vercel
            Speed Insights) sont RGPD-compatibles et ne collectent aucune donnée personnelle. Pour en savoir plus, consultez notre{' '}
            <Link href="/privacy-policy" className="font-medium underline underline-offset-4">
              politique de confidentialité
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button onClick={acceptCookies}>J&apos;ai compris</Button>
        </div>
      </div>
    </div>
  );
}
