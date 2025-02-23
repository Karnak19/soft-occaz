'use client';

import { getCookie, setCookie } from 'cookies-next';
import Link from 'next/link';
import { usePostHog } from 'posthog-js/react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const posthog = usePostHog();

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = getCookie('cookie-consent');

    // Handle migration from old cookie format
    if (hasConsented === 'accepted') {
      // Reset cookie to force new consent
      setShowConsent(true);
      return;
    }

    if (!hasConsented) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = (fullConsent: boolean) => {
    setCookie('cookie-consent', fullConsent ? 'full' : 'minimal', { maxAge: 365 * 24 * 60 * 60 }); // 1 year

    // Update PostHog tracking based on consent level
    if (!fullConsent) {
      posthog?.opt_out_capturing();
    }

    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        <div className="flex-1 text-sm text-muted-foreground">
          <p>
            Nous utilisons des cookies pour améliorer votre expérience sur notre site. Les cookies essentiels sont nécessaires au
            fonctionnement du site. Avec votre accord, nous utilisons également des outils d&apos;analyse pour comprendre comment
            vous utilisez notre site et l&apos;améliorer. Nous ne vendons jamais vos données à des tiers. Pour en savoir plus,
            consultez notre{' '}
            <Link href="/privacy-policy" className="font-medium underline underline-offset-4">
              politique de confidentialité
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => acceptCookies(false)}>
            Cookies essentiels uniquement
          </Button>
          <Button onClick={() => acceptCookies(true)}>Tout accepter</Button>
        </div>
      </div>
    </div>
  );
}
