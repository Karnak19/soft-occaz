import React from 'react';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';
import { type Prisma } from '@prisma/client';

function ListingRating(
  props: Prisma.RatingGetPayload<{
    include: { from: true };
  }>,
) {
  if (!props.from) return null;

  return (
    <div className="relative grid w-full grid-cols-[auto,1fr] grid-rows-2 gap-x-4 rounded-lg bg-white p-2 shadow">
      <div className="row-span-2">
        <img className="inline-block size-14 rounded-full" src={props.from.avatar!} alt="" />
      </div>
      <div className="flex items-center justify-start">
        <Link href={`/profile/${props.from.id}`} className="text-lg font-bold text-gray-900">
          <span className="absolute inset-0" aria-hidden="true" />
          {props.from.username}
        </Link>
      </div>

      {/* render props.rating <SolidStarIcon /> and complete with <StarIcon /> to make 5 */}
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="flex items-center justify-center">
            {i < props.rating ? (
              <SolidStarIcon className="size-6 text-amber-500" />
            ) : (
              <StarIcon className="size-6 text-amber-500" />
            )}
          </div>
        ))}
      </div>
      <div className="col-span-full px-2 pt-2 font-semibold italic text-gray-500">
        <p>{props.text}</p>
      </div>
    </div>
  );
}

export default ListingRating;
