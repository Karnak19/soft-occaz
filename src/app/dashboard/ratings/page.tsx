import React from 'react';

import { prisma } from '$/utils/db';
import { getClerkUserFromDb } from '$/utils/getClerkUserFromDb';
import { Card, CardContent, CardHeader } from '$/components/ui/card';
import Reviews from '$/app/profile/[userId]/Reviews';

import RatingForm from './rating-form';

export default async function page({}: {}) {
  const user = await getClerkUserFromDb();

  const ratingSessionsToGive = await prisma.ratingCreatorSession.findMany({
    where: { userId: user.id, rating: null },
    include: { target: true },
  });

  if (ratingSessionsToGive.length === 0) {
    return (
      <Card>
        <CardHeader></CardHeader>
        <CardContent>Vous n&apos;avez pas de notes à donner</CardContent>
      </Card>
    );
  }

  return (
    <div className="grid lg:grid-cols-3">
      <Reviews userId={user.id} className="lg:col-span-2 lg:py-16" />

      <div className="row-start-1 flex flex-col gap-3 lg:col-start-3">
        <h2 className="text-2xl font-bold">Évaluations à donner</h2>
        {ratingSessionsToGive.map((session) => (
          <RatingForm key={session.id} {...session} />
        ))}
      </div>
    </div>
  );
}
