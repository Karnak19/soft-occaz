'use client';

import { cn } from '$/utils/cn';
import SubLink from '$/components/SubLink';
import { Card } from '$/components/ui/card';
import { User } from '@prisma/client';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import { useUser } from '@clerk/nextjs';
import { Button } from '$/components/ui/button';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Spinner from '$/components/Spinner';

type DashboardProfileSectionProps = {
  user: User;
  verified?: boolean;
};
function DashboardProfileSection({ user: me, verified }: DashboardProfileSectionProps) {
  const { user } = useUser();
  const router = useRouter();

  const portal = useMutation({
    mutationFn: () => fetch('/api/create-portal-link', { method: 'POST' }).then((r) => r.json()),
    onSuccess: (data) => {
      window.location.href = data.url;
    },
  });

  return (
    <section className="col-span-full sm:col-span-2 h-full" aria-labelledby="profile-overview-title">
      <Card
        className={cn('overflow-hidden h-full relative ring-1 ring-muted', {
          'ring-teal-300': me?.sub === 'HOBBY',
          'ring-violet-300': me?.sub === 'GEARDO',
          'ring-amber-300': me?.sub === 'PREMIUM',
        })}
      >
        <h2 className="sr-only" id="profile-overview-title">
          Profile Overview
        </h2>
        <div
          className={cn('bg-card h-full p-6', {
            'bg-gradient-to-b from-teal-100 dark:from-teal-100/30 to-teal-50': me?.sub === 'HOBBY',
            'bg-gradient-to-b from-violet-100 dark:from-violet-100/30 to-violet-50': me?.sub === 'GEARDO',
            'bg-gradient-to-b from-amber-100  dark:from-amber-100/30 ': me?.sub === 'PREMIUM',
          })}
        >
          <div className="sm:flex h-full flex-col lg:flex-row sm:items-center lg:items-start sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <img
                  className={cn('mx-auto ring-1 h-20 w-20 rounded-full', {
                    'ring-teal-300': me?.sub === 'HOBBY',
                    'ring-violet-300': me?.sub === 'GEARDO',
                    'ring-amber-300': me?.sub === 'PREMIUM',
                  })}
                  src={me?.avatar ?? user?.imageUrl}
                  alt={me?.username ?? user?.username ?? 'Avatar'}
                />
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-sm font-medium text-muted-foreground">Re-bonjour,</p>
                <p className="text-xl font-bold text-foreground sm:text-2xl">{me?.username ?? user?.username}</p>
                <div className="flex gap-2">
                  <p className="flex items-center text-sm font-medium text-muted-foreground">
                    {verified ? (
                      <>
                        <CheckBadgeIcon className="h-5 w-5 text-green-600" /> <span>Verified</span>
                      </>
                    ) : (
                      <span className="inline-block flex-shrink-0 rounded-full bg-red-200 px-2 py-0.5 text-xs font-medium text-red-800">
                        Not verified
                      </span>
                    )}
                  </p>
                  {me?.sub && <SubLink sub={me.sub} />}
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              <Button
                onClick={() => {
                  if (me.stripeId && me.sub !== 'FREE') {
                    portal.mutate();
                  } else {
                    router.push('/pricing');
                  }
                }}
                variant="premium"
                size="sm"
              >
                {portal.isPending ? <Spinner className="text-rg-500 " /> : null}
                Gérer mon abonnement
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

export default DashboardProfileSection;
