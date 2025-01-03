'use client';

import { useRouter } from 'next/navigation';
import type { AuthProviderInfo } from 'pocketbase';

import { Collections } from '$/utils/pocketbase/pocketbase-types';
import { Button } from '$/components/ui/button';
import { usePocketbase } from '$/app/pocketbase-provider';

interface OAuthProvidersProps {
  providers: AuthProviderInfo[];
}

export function OAuthProviders({ providers }: OAuthProvidersProps) {
  const { pb } = usePocketbase();
  const router = useRouter();

  const handleClick = async (provider: AuthProviderInfo) => {
    try {
      await pb.collection(Collections.Users).authWithOAuth2({ provider: provider.name });
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
