'use client';

import { Tab } from '@headlessui/react';

import { cn } from '$/utils/cn';
import { imgKitUrl } from '$/utils/imgKitUrl';

function ProductImageGallery({ images }: { images: string[] }) {
  if (!images) return null;

  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      {/* Image selector */}
      <div className="mx-auto mt-6 w-full max-w-2xl lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((image) => {
            const url = imgKitUrl(image);

            return (
              <Tab
                key={url}
                className="relative flex h-24 cursor-pointer items-center justify-center rounded-md font-medium uppercase text-foreground hover:bg-muted focus:outline-none focus:ring focus:ring-primary focus:ring-offset-4"
              >
                {({ selected }) => (
                  <>
                    <span className="sr-only"> {image} </span>
                    <span className="absolute inset-0 overflow-hidden rounded-md">
                      <img src={url} alt="" className="size-full object-cover object-center" />
                    </span>
                    <span
                      className={cn(
                        selected ? 'ring-primary' : 'ring-transparent',
                        'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2 ring-offset-muted dark:ring-offset-2',
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

      <Tab.Panels className="aspect-square w-full">
        {images.map((image) => {
          const url = imgKitUrl(image);

          return (
            <Tab.Panel className="grid aspect-square place-items-center" key={image}>
              <img src={url} alt={image} className="mx-auto object-cover sm:rounded-lg" />
            </Tab.Panel>
          );
        })}
      </Tab.Panels>
    </Tab.Group>
  );
}

export default ProductImageGallery;
