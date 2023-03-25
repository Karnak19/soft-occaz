'use client';

import { Tab } from '@headlessui/react';

import { cn } from '$/utils/cn';

function ProductImageGallery({
  images,
}: {
  images?: {
    id: string;
    name: string;
    src: string;
    alt?: string;
  }[];
}) {
  if (!images) return null;

  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      {/* Image selector */}
      <div className="mx-auto mt-6 w-full max-w-2xl lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((image) => (
            <Tab
              key={image.id}
              className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
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
          <Tab.Panel className="aspect-square grid place-items-center" key={image.id}>
            <img src={image.src} alt={image.alt} className="object-cover mx-auto sm:rounded-lg" />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}

export default ProductImageGallery;
