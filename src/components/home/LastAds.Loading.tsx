import React from 'react';
import { cn } from '$/utils/cn';

function ProductCard() {
  return (
    <div className="group relative grid grid-cols-1 grid-rows-[2fr,1fr] duration-100 hover:grid-rows-[1fr,1fr] overflow-hidden rounded shadow hover:shadow-md hover:shadow-gray-400 aspect-square shadow-gray-400">
      <div
        className={cn(
          'w-full h-full overflow-hidden aspect-video transition-opacity bg-rg-500/60 group-hover:opacity-75 animate-pulse',
        )}
      />
      <div className={cn('flex flex-col gap-2 p-2')}>
        <div className="flex gap-4">
          <div className="w-3/4 h-6 rounded bg-rg-500/60 animate-pulse" />
          <div className="w-1/4 h-6 rounded bg-rg-500/60 animate-pulse" />
        </div>
        <div className="w-1/2 h-4 rounded bg-rg-500/40 animate-pulse" />
      </div>
    </div>
  );
}

function LastAdsLoading({}: {}) {
  return (
    <ul className="inline-flex py-5 mx-4 space-x-8 lg:mx-0 lg:px-4 sm:mx-6 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0">
      {Array.from({ length: 4 }).map((_, index) => (
        <li key={index} className="w-64 lg:w-auto">
          <ProductCard />
        </li>
      ))}
    </ul>
  );
}

export default LastAdsLoading;
