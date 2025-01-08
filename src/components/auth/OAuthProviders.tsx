'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import type { AuthProviderInfo } from 'pocketbase';
import { useServerAction } from 'zsa-react';

import { usePocketbase } from '$/app/pocketbase-provider';
import { Button } from '$/components/ui/button';
import { Collections, UsersResponse } from '$/utils/pocketbase/pocketbase-types';

import { verifyOAuthReferralCode } from './actions';

interface OAuthProvidersProps {
  providers: AuthProviderInfo[];
}

export function OAuthProviders({ providers }: OAuthProvidersProps) {
  const { pb } = usePocketbase();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { execute: verifyReferral } = useServerAction(verifyOAuthReferralCode);

  const handleClick = async (provider: AuthProviderInfo) => {
    try {
      const referralCode = searchParams.get('code');
      const authData = await pb.collection(Collections.Users).authWithOAuth2<UsersResponse>({
        provider: provider.name,
      });

      // If there's a referral code and this is a new user (no referrer set), verify it
      if (referralCode && !authData.record.referrer) {
        await verifyReferral({
          userId: authData.record.id,
          referralCode,
        });
      }

      router.refresh();
      router.push('/dashboard');
    } catch (error) {
      console.error('OAuth authentication error:', error);
    }
  };

  return (
    <div className="grid gap-4">
      {providers.map((provider) => (
        <Button key={provider.name} variant="outline" className="w-full" onClick={() => handleClick(provider)}>
          Continuer avec {provider.name.charAt(0).toUpperCase() + provider.name.slice(1)}
        </Button>
      ))}
    </div>
  );
}
