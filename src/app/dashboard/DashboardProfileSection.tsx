'use client';

import { useUser } from '@clerk/nextjs';
import { CheckBadgeIcon } from '@heroicons/react/20/solid';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import AbsoluteBlurredSpinner from '$/components/AbsoluteBlurredSpinner';
import Button from '$/components/Button';
import Spinner from '$/components/Spinner';
import { useGetMyAnnonces } from '$/hooks/useGetMyAnnonces';
import { useMe } from '$/hooks/useMe';
import { cn } from '$/utils/cn';
import SubLink from '$/components/SubLink';

function DashboardProfileSection() {
  const { user } = useUser();
  const { data: me, isLoading } = useMe();
  const router = useRouter();

  const { data: annonces, isLoading: isAnnoncesLoading } = useGetMyAnnonces();

  const portal = useMutation({
    mutationFn: () => fetch('/api/create-portal-link', { method: 'POST' }).then((r) => r.json()),
    onSuccess: (data) => {
      window.location.href = data.url;
    },
  });

  const stats = useMemo(() => {
    return [
      { label: 'Annonces en ligne', value: annonces?.length || 0, isLoading: isAnnoncesLoading },
      { label: 'Coming soon', value: 0, isLoading: false },
      { label: 'Coming soon', value: 0, isLoading: false },
    ];
  }, [annonces, isAnnoncesLoading]);

  return (
    <section aria-labelledby="profile-overview-title">
      <div
        className={cn('overflow-hidden relative rounded-lg bg-white shadow', {
          'ring-2 ring-teal-300': me?.sub === 'HOBBY',
          'ring-2 ring-violet-300': me?.sub === 'GEARDO',
          'ring-2 ring-amber-300': me?.sub === 'PREMIUM',
        })}
      >
        <AbsoluteBlurredSpinner isLoading={isLoading} />
        <h2 className="sr-only" id="profile-overview-title">
          Profile Overview
        </h2>
        <div
          className={cn('bg-white p-6', {
            'bg-gradient-to-tl from-teal-100 to-teal-50': me?.sub === 'HOBBY',
            'bg-gradient-to-tl from-violet-100 to-violet-50': me?.sub === 'GEARDO',
            'bg-gradient-to-tl from-amber-100 to-amber-50': me?.sub === 'PREMIUM',
          })}
        >
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <img
                  className={cn('mx-auto h-20 w-20 rounded-full', {
                    ring: me?.sub !== 'FREE',
                    'ring-teal-300': me?.sub === 'HOBBY',
                    'ring-violet-300': me?.sub === 'GEARDO',
                    'ring-amber-300': me?.sub === 'PREMIUM',
                  })}
                  src={me?.avatar ?? user?.imageUrl}
                  alt={me?.username ?? user?.username ?? 'Avatar'}
                />
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-sm font-medium text-gray-600">Re-bonjour,</p>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">{me?.username ?? user?.username}</p>
                <div className="flex gap-2">
                  <p className="flex items-center text-sm font-medium text-gray-600">
                    {user?.hasVerifiedEmailAddress || user?.hasVerifiedPhoneNumber ? (
                      <>
                        <CheckBadgeIcon className="h-5 w-5 text-green-600" /> <span>Verified</span>
                      </>
                    ) : (
                      <span className="inline-block flex-shrink-0 rounded-full bg-red-200 px-2 py-0.5 text-xs font-medium text-red-800">
                        Not verified
                      </span>
                    )}
                  </p>
                  {!isLoading && me?.sub && <SubLink sub={me.sub} />}
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              <Button
                onClick={() => {
                  if (me?.subscriptions.length) {
                    portal.mutate();
                  } else {
                    router.push('/pricing');
                  }
                }}
                variant="premium"
                size="sm"
              >
                {portal.isLoading ? <Spinner className="text-rg-500 " /> : null}
                Gérer mon abonnement
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat, i) => (
            <div key={stat.label + i} className="relative px-6 py-5 text-center text-sm font-medium">
              <span className="text-gray-900">{!!stat.value && stat.value}</span>{' '}
              <span className="text-gray-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DashboardProfileSection;
