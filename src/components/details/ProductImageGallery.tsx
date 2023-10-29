'use client';

import { Tab } from '@headlessui/react';

import { cn } from '$/utils/cn';
import { imgKitUrl } from '$/utils/imgKitUrl';

function ProductImageGallery({ images }: { images: string[] }) {
  if (!images) return null;

  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      {/* Image selector */}
      <div className="w-full max-w-2xl mx-auto mt-6 lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((image) => {
            const url = imgKitUrl(image);

            return (
              <Tab
                key={url}
                className="relative flex items-center justify-center h-24 font-medium text-gray-900 uppercase bg-white rounded-md cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
              >
                {({ selected }) => (
                  <>
                    <span className="sr-only"> {image} </span>
                    <span className="absolute inset-0 overflow-hidden rounded-md">
                      <img src={url} alt="" className="object-cover object-center w-full h-full" />
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
            );
          })}
        </Tab.List>
      </div>

      <Tab.Panels className="w-full aspect-square">
        {images.map((image) => {
          const url = imgKitUrl(image);

          return (
            <Tab.Panel className="grid aspect-square place-items-center" key={image}>
              <img src={url} alt={image} className="object-cover mx-auto sm:rounded-lg" />
            </Tab.Panel>
          );
        })}
      </Tab.Panels>
    </Tab.Group>
  );
}

export default ProductImageGallery;
