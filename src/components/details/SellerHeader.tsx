import {
  CalendarIcon,
  CheckBadgeIcon,
  CircleStackIcon,
  CreditCardIcon,
  MapPinIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';

import StarsDisplayer from '$/components/StarsDisplayer';
import UserAvatar from '$/components/UserAvatar';
import TierBadge from '$/components/badges/TierBadge';
import { getPaymentMethodLabel } from '$/utils/getPaymentMethodLabel';
import { getShippingMethodLabel } from '$/utils/getShippingMethodLabel';
import { ReferralTiersResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { createServerClient } from '$/utils/pocketbase/server';
import ContactButton from './contact-button';

interface SellerHeaderProps {
  user: UsersResponse;
  isProfilePage?: boolean;
}

export default async function SellerHeader({ user, isProfilePage = false }: SellerHeaderProps) {
  const userCreatedRelative = formatDistance(new Date(user.created), new Date(), { locale: fr });
  const pb = await createServerClient();

  const [rating, listingsCount, tierData] = await Promise.all([
    pb
      .collection('users_average_rating')
      .getOne<{ average_rating: number; rating_count: number }>(user.id, {
        requestKey: 'user-rating',
      })
      .catch(() => ({ average_rating: 0, rating_count: 0 })),
    pb
      .collection('listings')
      .getList(1, 1, {
        filter: `user = "${user.id}"`,
        requestKey: 'user-listings-count',
      })
      .catch(() => ({ totalItems: 0 })),
    pb
      .collection('referral_tiers')
      .getOne<ReferralTiersResponse<'master' | 'gold' | 'silver' | 'bronze'>>(user.id)
      .catch(() => null),
  ]);

  const paymentMethodLabel = getPaymentMethodLabel(user.payment);
  const shippingMethodLabel = getShippingMethodLabel(user.shipping);

  return (
    <div className="border-b border-border">
      <div className="py-6 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <Link href={`/profile/${user.id}`} className="shrink-0 hover:opacity-80">
              <UserAvatar user={user} size="lg" />
            </Link>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Link href={`/profile/${user.id}`} className="hover:underline">
                  <h2 className="truncate text-xl font-semibold text-foreground">{user.name}</h2>
                </Link>
                {user.verified && <CheckBadgeIcon className="size-5 shrink-0 text-primary" />}
                {tierData?.tier && <TierBadge tier={tierData.tier} />}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                {user.departement > 0 ? (
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="size-4 shrink-0" />
                    <span>{user.departement}</span>
                  </div>
                ) : null}
                <div className="flex items-center gap-1">
                  <CalendarIcon className="size-4 shrink-0" />
                  <span>Membre depuis {userCreatedRelative}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CircleStackIcon className="size-4 shrink-0" />
                  <span>{listingsCount.totalItems} annonces</span>
                </div>
                {paymentMethodLabel && (
                  <div className="flex items-center gap-1">
                    <CreditCardIcon className="size-4 shrink-0" />
                    <span>Paiement: {paymentMethodLabel}</span>
                  </div>
                )}
                {shippingMethodLabel && (
                  <div className="flex items-center gap-1">
                    <TruckIcon className="size-4 shrink-0" />
                    <span>Expédition: {shippingMethodLabel}</span>
                  </div>
                )}
              </div>
              {rating.rating_count >= 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <StarsDisplayer average={rating.average_rating} size="md" />
                  <span className="text-sm text-muted-foreground">
                    ({rating.average_rating.toFixed(1)}/5 - {rating.rating_count} avis)
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="sm:shrink-0">
            <ContactButton user={user} context={isProfilePage ? 'profile' : 'listing'} />
          </div>
        </div>
      </div>
    </div>
  );
}
