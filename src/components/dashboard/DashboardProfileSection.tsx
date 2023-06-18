'use client';

import { useUser } from '@clerk/nextjs';
import { CheckBadgeIcon } from '@heroicons/react/20/solid';
import { useMemo } from 'react';

import { useGetMyAnnonces } from '$/hooks/useGetMyAnnonces';

import Spinner from '../Spinner';

function DashboardProfileSection() {
  const { user } = useUser();

  const { data: annonces, isLoading: isAnnoncesLoading } = useGetMyAnnonces();

  const stats = useMemo(() => {
    return [
      { label: 'Annonces en ligne', value: annonces?.totalItems || 0, isLoading: isAnnoncesLoading },
      { label: 'Coming soon', value: 0, isLoading: false },
      { label: 'Coming soon', value: 0, isLoading: false },
    ];
  }, [annonces, isAnnoncesLoading]);

  return (
    <section aria-labelledby="profile-overview-title">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <h2 className="sr-only" id="profile-overview-title">
          Profile Overview
        </h2>
        <div className="bg-white p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <img className="mx-auto h-20 w-20 rounded-full" src={user?.imageUrl} alt="" />
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-sm font-medium text-gray-600">Re-bonjour,</p>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user?.username}</p>
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
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              {/* <Link
                href={`/profile/${user.id}`}
                className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                View profile
              </Link> */}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat, i) => (
            <div key={stat.label + i} className="relative px-6 py-5 text-center text-sm font-medium">
              {stat.isLoading && (
                <div className="absolute inset-0 grid place-items-center backdrop-blur-sm">
                  <Spinner className="text-rg" />
                </div>
              )}
              <span className="text-gray-900">{stat.value}</span> <span className="text-gray-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DashboardProfileSection;
