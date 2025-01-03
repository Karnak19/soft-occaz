import React from 'react';

import type { RatingSessionsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { auth, createServerClient } from '$/utils/pocketbase/server';
import Reviews from '$/app/profile/[userId]/Reviews';

import RatingForm from './rating-form';

export default async function page({}: {}) {
  const { user } = await auth();
  const pb = await createServerClient();

  const ratingSessionsToGive = await pb
    .collection('rating_sessions')
    .getFullList<RatingSessionsResponse<{ target: UsersResponse }>>({
      filter: `rating = null`,
      expand: 'target',
    });

  return (
    <div className="grid lg:grid-cols-3">
      <Reviews userId={user.id} className="col-span-full lg:py-16" />

      <div className="col-span-full row-start-1 flex flex-col gap-3">
        {Boolean(ratingSessionsToGive.length) && (
          <>
            <h2 className="text-2xl font-bold">Évaluations à donner</h2>
            {ratingSessionsToGive.map((session) => (
              <RatingForm key={session.id} {...session} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
