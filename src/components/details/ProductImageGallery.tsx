'use client';

import { Tab } from '@headlessui/react';
import { useMemo } from 'react';

import { cn } from '$/utils/cn';
import { AnnoncesResponse } from '$/utils/pocketbase-types';

import { usePocket } from '../PocketContext';

function ProductImageGallery({ ad }: { ad: AnnoncesResponse }) {
  const { pb } = usePocket();

  const images = useMemo(
    () =>
      ad.images?.map((field) => {
        return {
          id: field,
          name: 'Angled view',
          alt: 'Angled front view with bag zipped and handles upright.',
          src: pb.getFileUrl(ad, field),
        };
      }),
    [],
  );

  if (!images) return null;

  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      {/* Image selector */}
      <div className="mx-auto mt-6 w-full max-w-2xl lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((image) => (
            <Tab
              key={image.id}
              className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
            >
              {({ selected }) => (
                <>
                  <span className="sr-only"> {image.name} </span>
                  <span className="absolute inset-0 overflow-hidden rounded-md">
                    <img src={image.src} alt="" className="h-full w-full object-cover object-center" />
                  </span>
                  <span
                    className={cn(
                      selected ? 'ring-indigo-500' : 'ring-transparent',
                      'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2',
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </Tab>
          ))}
        </Tab.List>
      </div>

      <Tab.Panels className="aspect-square w-full">
        {images.map((image) => (
          <Tab.Panel className="grid aspect-square place-items-center" key={image.id}>
            <img src={image.src} alt={image.alt} className="mx-auto object-cover sm:rounded-lg" />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}

export default ProductImageGallery;
