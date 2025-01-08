import { ChatBubbleLeftRightIcon } from '@heroicons/react/20/solid';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import TierBadge from '$/components/badges/TierBadge';
import { Button } from '$/components/ui/button';
import { RatingsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { auth, createServerClient } from '$/utils/pocketbase/server';

async function Aside({ user }: { user: UsersResponse }) {
  const { userId } = await auth();

  const pb = await createServerClient();

  const ratings = await pb.collection('ratings').getFullList<RatingsResponse>({
    filter: `user = "${userId}"`,
  });

  const average = ratings.reduce((acc, cur) => acc + cur.rating, 0) / ratings.length;

  const tierData = await pb.collection('referral_tiers').getOne(user.id);

  const informations = {
    Inscription: format(user.created, 'MMMM yyyy', {
      locale: fr,
    }),
    ...(userId && { Email: user.email }),
    Rating: isNaN(average) ? 'Aucune note' : `${average.toFixed(1)} / 5 (${ratings.length} avis)`,
    Tier: tierData?.tier ? <TierBadge tier={tierData.tier} showLabel /> : null,
  };

  return (
    <aside className="border-border bg-card p-8 text-foreground lg:w-80 lg:overflow-y-auto lg:border-l">
      <div className="space-y-6 pb-16">
        <div>
          {user.avatar && (
            <div className="grid w-full place-items-center overflow-hidden">
              <img src={pb.files.getURL(user, user.avatar)} alt="" className="rounded-lg" />
            </div>
          )}
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium">
                <span className="sr-only">Details for </span>
                {user.name}
              </h2>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-medium">Information</h3>
          <dl className="mt-2 divide-y divide-gray-200 border-y border-gray-200">
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
          <form className="w-full flex-1">
            <Button type="submit" className="w-full flex-1 justify-center gap-x-1">
              <ChatBubbleLeftRightIcon className="size-5" aria-hidden="true" />
              Chat
            </Button>
          </form>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
