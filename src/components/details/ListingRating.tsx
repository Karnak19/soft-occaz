import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';
import { type Prisma } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

function ListingRating(
  props: Prisma.RatingGetPayload<{
    include: { from: true };
  }>,
) {
  return (
    <div className="grid relative grid-cols-[auto,1fr] grid-rows-2 gap-x-4 bg-white p-2 shadow rounded-lg w-full">
      <div className="row-span-2">
        <img className="inline-block h-14 w-14 rounded-full" src={props.from.avatar!} alt="" />
      </div>
      <div className="flex justify-start items-center">
        <Link href={`/profile/${props.from.id}`} className="text-gray-900 font-bold text-lg">
          <span className="absolute inset-0" aria-hidden="true" />
          {props.from.username}
        </Link>
      </div>

      {/* render props.rating <SolidStarIcon /> and complete with <StarIcon /> to make 5 */}
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="flex items-center justify-center">
            {i < props.rating ? (
              <SolidStarIcon className="w-6 h-6 text-amber-500" />
            ) : (
              <StarIcon className="w-6 h-6 text-amber-500" />
            )}
          </div>
        ))}
      </div>
      <div className="col-span-full px-2 pt-2 italic font-semibold text-gray-500">
        <p>{props.text}</p>
      </div>
    </div>
  );
}

export default ListingRating;
