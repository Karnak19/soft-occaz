'use client';
import { CalendarIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import formatDistance from 'date-fns/formatDistance';
import fr from 'date-fns/locale/fr';
import Link from 'next/link';

import { useGetMyAnnonces } from '$/hooks/useGetMyAnnonces';
import { Thumb } from '$/utils/thumbs';

import Badge from '../Badge';
import { usePocket } from '../PocketContext';

export default function DashboardAnnoncesList() {
  const { pb } = usePocket();
  const { data } = useGetMyAnnonces();

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {data?.items.map((annonce) => (
          <li key={annonce.id}>
            <Link href={`/annonces/details/${annonce.id}`} className="block hover:bg-gray-50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
                  <div className="truncate">
                    <div className="flex text-sm">
                      <p className="flex-shrink-0 mr-2 font-normal text-gray-500">
                        <Badge variant={annonce.type} />
                      </p>
                      <p className="font-medium truncate text-rg">{annonce.title}</p>
                    </div>
                    <div className="flex mt-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <p>Créée {formatDistance(new Date(annonce.created), new Date(), { addSuffix: true, locale: fr })}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 mt-4 sm:ml-5 sm:mt-0">
                    <div className="flex -space-x-1 overflow-hidden">
                      {annonce.images?.map((img, i) => (
                        // eslint-disable-next-line jsx-a11y/img-redundant-alt
                        <img
                          key={img + i}
                          className="inline-block w-10 h-10 rounded-full ring-2 ring-white"
                          src={pb.getFileUrl(annonce, img, {
                            thumb: Thumb.avatar,
                          })}
                          alt={`${annonce.title} picture ${i}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {/* TODO: Coming soon */}
                {/* <div className="pl-4">
                  <Link
                    href={`/dashboard/annonces/${annonce.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="flex items-center justify-center px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-rg-light"
                  >
                    Edit
                  </Link>
                </div> */}
                <div className="flex-shrink-0 ml-5">
                  <ChevronRightIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
