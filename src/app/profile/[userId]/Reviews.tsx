import { StarIcon } from '@heroicons/react/20/solid';

import { cn } from '$/utils/cn';
import type { RatingsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { createServerClient } from '$/utils/pocketbase/server';

export default async function Reviews({ userId, className }: { userId: string; className?: string }) {
  const pb = await createServerClient();

  const ratings = await pb.collection('ratings').getFullList<RatingsResponse<{ from: UsersResponse }>>({
    filter: `user = "${userId}"`,
    expand: 'from',
  });

  const totalCount = ratings.length;

  const average = ratings.reduce((acc, { rating }) => acc + rating, 0) / ratings.length;

  const basedOn = ratings.reduce(
    (acc, { rating }) => {
      acc[rating] = (acc[rating] || 0) + 1;

      return acc;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<number, number>,
  );

  return (
    <>
      <div
        className={cn(
          'mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-4 lg:px-8 lg:py-32',
          className,
        )}
      >
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Avis des acheteurs</h2>
          <div className="mt-3 flex items-center">
            <div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={cn(
                      average > rating ? 'text-yellow-400' : 'text-muted-foreground dark:text-muted',
                      'size-5 shrink-0',
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{average} sur 5 étoiles</p>
            </div>
            <p className="ml-2 text-sm text-foreground">Basé sur {totalCount} avis</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Review data</h3>

            <dl className="flex flex-col-reverse gap-3">
              {Object.entries(basedOn).map(([key, value]) => (
                <div key={key} className="flex items-center text-sm">
                  <dt className="flex flex-1 items-center">
                    <p className="w-3 font-medium text-foreground">
                      {key}
                      <span className="sr-only"> star reviews</span>
                    </p>
                    <div aria-hidden="true" className="ml-1 flex flex-1 items-center">
                      <StarIcon
                        className={cn(value > 0 ? 'text-yellow-400' : 'text-muted-foreground dark:text-muted', 'size-5 shrink-0')}
                        aria-hidden="true"
                      />

                      <div className="relative ml-3 flex-1">
                        <div className="h-3 rounded-full border border-border bg-muted" />
                        {value > 0 ? (
                          <div
                            className="absolute inset-0 rounded-full border border-yellow-400 bg-yellow-400"
                            style={{ width: `calc(${value} / ${totalCount} * 100%)` }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </dt>
                  <dd className="ml-3 w-10 text-right text-sm tabular-nums text-foreground">
                    {Math.round((value ?? 0 / totalCount ?? 0) * 100)}%
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-medium text-foreground">Partagez votre avis</h3>
            <p>Si vous avez acheté quelque chose à ce vendeur, partagez votre avis directement sur la page de l&apos;annonce.</p>
          </div>
        </div>

        <div className="mt-16 lg:col-span-6 lg:col-start-6 lg:mt-0">
          <h3 className="sr-only">Recent reviews</h3>

          <div className="flow-root">
            <div className="-my-12 divide-y divide-gray-200">
              {[...ratings].slice(0, 3).map((rating) => {
                if (!rating.expand?.from) return null;

                return (
                  <div key={rating.id} className="py-8">
                    <div className="flex items-center">
                      <img
                        src={pb.files.getURL(rating.expand?.from, rating.expand?.from.avatar, { thumb: '100x100' })}
                        alt={`${rating.expand?.from.name}.`}
                        className="size-12 rounded-full"
                      />
                      <div className="ml-4">
                        <h4 className="text-sm font-bold text-foreground">{rating.expand?.from.name}</h4>
                        <div className="mt-1 flex items-center">
                          {[0, 1, 2, 3, 4].map((note) => (
                            <StarIcon
                              key={note}
                              className={cn(
                                rating.rating > note ? 'text-yellow-400' : 'text-muted-foreground dark:text-muted',
                                'size-5 shrink-0',
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="sr-only">{rating.rating} sur 5 étoiles</p>
                      </div>
                    </div>

                    <p className="mt-4 space-y-6 text-base italic text-muted-foreground">{rating.comment}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
