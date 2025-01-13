import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import TierBadge from '$/components/badges/TierBadge';
import { ReferralTiersResponse, UsersAverageRatingResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { createServerClient } from '$/utils/pocketbase/server';
import ChatButton from './chat-button';

async function Aside({ user }: { user: UsersResponse }) {
  const pb = await createServerClient();

  const rating = await pb
    .collection('users_average_rating')
    .getOne<UsersAverageRatingResponse<number>>(user.id)
    .catch(() => null);

  const tierData = await pb
    .collection('referral_tiers')
    .getOne<ReferralTiersResponse<'master' | 'gold' | 'silver' | 'bronze'>>(user.id);

  const informations = {
    Inscription: format(user.created, 'MMMM yyyy', {
      locale: fr,
    }),
    Rating: rating?.average_rating ? `${rating.average_rating.toFixed(1)} / 5 (${rating.rating_count} avis)` : 'Aucune note',
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
          <ChatButton recipientId={user.id} />
        </div>
      </div>
    </aside>
  );
}

export default Aside;
