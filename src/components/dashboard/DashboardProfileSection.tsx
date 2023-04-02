import { CheckBadgeIcon } from '@heroicons/react/20/solid';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useMemo } from 'react';

import { AnnoncesResponse, Collections } from '$/utils/pocketbase-types';

import { usePocket } from '../PocketContext';
import Spinner from '../Spinner';

function DashboardProfileSection() {
  const { user, pb } = usePocket();

  const { data: annonces, isLoading: isAnnoncesLoading } = useQuery({
    queryKey: ['annonces', { id: user.id }],
    queryFn: () =>
      pb.collection(Collections.Annonces).getList<AnnoncesResponse>(1, 15, {
        filter: `user.id = "${user.id}"`,
      }),
  });

  const stats = useMemo(() => {
    return [
      { label: 'Annonces en ligne', value: annonces?.totalItems || 0, isLoading: isAnnoncesLoading },
      { label: 'Coming soon', value: 0, isLoading: false },
      { label: 'Coming soon', value: 0, isLoading: false },
    ];
  }, [annonces, isAnnoncesLoading]);

  return (
    <section aria-labelledby="profile-overview-title">
      <div className="overflow-hidden bg-white rounded-lg shadow">
        <h2 className="sr-only" id="profile-overview-title">
          Profile Overview
        </h2>
        <div className="p-6 bg-white">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <img
                  className="w-20 h-20 mx-auto rounded-full"
                  src={pb.getFileUrl(user, user.avatar, { thumb: '100x100' })}
                  alt=""
                />
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-sm font-medium text-gray-600">Re-bonjour,</p>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user.username}</p>
                <p className="flex items-center text-sm font-medium text-gray-600">
                  {user.verified ? (
                    <>
                      <CheckBadgeIcon className="w-5 h-5 text-green-600" /> <span>Verified</span>
                    </>
                  ) : (
                    <span className="inline-block flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium bg-red-200 text-red-800">
                      Not verified
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-5 sm:mt-0">
              <Link
                href={`/profile/${user.id}`}
                className="flex items-center justify-center px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                View profile
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 border-t border-gray-200 divide-y divide-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat, i) => (
            <div key={stat.label + i} className="relative px-6 py-5 text-sm font-medium text-center">
              {stat.isLoading && (
                <div className="absolute inset-0 grid backdrop-blur-sm place-items-center">
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
