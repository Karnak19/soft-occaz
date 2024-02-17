import React from 'react';

import { cn } from '$/utils/cn';

function ProductCard() {
  return (
    <div className="group relative grid aspect-square grid-cols-1 grid-rows-[2fr,1fr] overflow-hidden rounded shadow shadow-gray-400 duration-100 hover:grid-rows-[1fr,1fr] hover:shadow-md hover:shadow-gray-400">
      <div
        className={cn(
          'aspect-video size-full animate-pulse overflow-hidden bg-primary/60 transition-opacity group-hover:opacity-75',
        )}
      />
      <div className={cn('flex flex-col gap-2 p-2')}>
        <div className="flex gap-4">
          <div className="h-6 w-3/4 animate-pulse rounded bg-primary/60" />
          <div className="h-6 w-1/4 animate-pulse rounded bg-primary/60" />
        </div>
        <div className="h-4 w-1/2 animate-pulse rounded bg-primary/40" />
      </div>
    </div>
  );
}

function LastAdsLoading({}: {}) {
  return (
    <ul className="mx-4 inline-flex space-x-8 py-5 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0 lg:px-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <li key={index} className="w-64 lg:w-auto">
          <ProductCard />
        </li>
      ))}
    </ul>
  );
}

export default LastAdsLoading;
