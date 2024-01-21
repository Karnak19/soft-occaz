import { ChatBubbleLeftRightIcon, ShieldExclamationIcon, StarIcon } from '@heroicons/react/20/solid';
import { type User } from '@prisma/client';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';

import { Button } from '$/components/ui/button';
import { cn } from '$/utils/cn';
import { isHighlighted } from '$/utils/isHighlighted';
import { prisma } from '$/utils/db';

import { createChatAction } from '$/app/dashboard/chats/action';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '$/components/ui/tooltip';
import { auth } from '@clerk/nextjs';

async function Aside({ user }: { user: User }) {
  const { userId } = await auth();
  const ratings = await prisma.rating.findMany({
    where: { user: { id: user.id } },
  });

  const action = createChatAction.bind(null, { targetId: user.clerkId });

  const average = ratings.reduce((acc, cur) => acc + cur.rating, 0) / ratings.length;

  const informations = {
    Inscription: format(user.createdAt, 'MMMM yyyy', {
      locale: fr,
    }),
    ...(userId && { Email: user.email }),
    Rating: isNaN(average) ? 'Aucune note' : `${average.toFixed(1)} / 5 (${ratings.length} avis)`,
  };

  const sub = user.sub?.toLowerCase() ?? '';

  return (
    <aside
      className={cn('lg:w-80 lg:overflow-y-auto lg:border-l border-border bg-card text-foreground p-8', {
        'bg-gradient-to-b from-amber-100/30 via-transparent': sub === 'premium',
        'bg-gradient-to-b from-violet-100/30': sub === 'geardo',
        'bg-gradient-to-b from-teal-100/30': sub === 'hobby',
      })}
    >
      <div className="space-y-6 pb-16">
        <div>
          {user.avatar && (
            <div className="w-full grid place-items-center overflow-hidden">
              <img src={user.avatar} alt="" className="rounded-lg" />
            </div>
          )}
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium">
                <span className="sr-only">Details for </span>
                {user.username}
              </h2>
              {/* <p className="text-sm font-medium text-muted-foreground">{currentFile.size}</p> */}
            </div>
            <Link
              href="/dashboard/plans"
              className={cn(
                'inline-flex flex-shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset capitalize',
                {
                  'bg-teal-50 text-teal-700 ring-teal-600/20': sub === 'hobby',
                  'bg-violet-50 text-violet-700 ring-violet-600/20': sub === 'geardo',
                  'bg-amber-50 text-amber-700 ring-amber-600/20': sub === 'premium',
                },
              )}
            >
              <span>
                <StarIcon
                  className={cn('h-3 w-3 mr-0.5', {
                    'text-teal-400': sub === 'hobby',
                    'text-violet-400': sub === 'geardo',
                    'text-amber-400': sub === 'premium',
                  })}
                  aria-hidden="true"
                />
              </span>
              {sub.toLowerCase()}
            </Link>
          </div>
        </div>
        <div>
          <h3 className="font-medium">Information</h3>
          <dl
            className={cn('mt-2 divide-y divide-gray-200 border-b border-t border-gray-200', {
              'divide-gray-500 border-gray-500': isHighlighted(user.sub),
            })}
          >
            {Object.entries(informations).map(([key, value]) => (
              <div key={key} className="flex justify-between py-3 text-sm font-medium">
                <dt className="text-muted-foreground">{key}</dt>
                <dd className="whitespace-nowrap">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div></div>
        <div className="flex flex-col gap-y-3">
          <form action={action} className="flex-1 w-full">
            <Button type="submit" className="flex-1 w-full justify-center gap-x-1">
              <ChatBubbleLeftRightIcon className="w-5 h-5 " aria-hidden="true" />
              Chat
            </Button>
          </form>
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <span tabIndex={0} className="w-full flex-1">
                  <Button
                    type="button"
                    disabled
                    variant="destructive"
                    className="flex-1 w-full justify-center gap-x-1 pointer-events-none"
                  >
                    <ShieldExclamationIcon className="w-5 h-5 " aria-hidden="true" />
                    Report
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-rg-400 dark:bg-primary">
                <span>Coming soon !</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
