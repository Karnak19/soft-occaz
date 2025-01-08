'use client';

import { usePocketbase, useUserReferrals } from '$/app/pocketbase-provider';
import { Avatar, AvatarFallback, AvatarImage } from '$/components/ui/avatar';
import { cn } from '$/utils/cn';
import { UsersResponse } from '$/utils/pocketbase/pocketbase-types';

import TierBadge from './badges/TierBadge';

type UserAvatarProps = {
  user: UsersResponse;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeMap = {
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
} as const;

export default function UserAvatar({ user, size = 'md', className }: UserAvatarProps) {
  const { pb } = usePocketbase();
  const { data: referrals, isLoading } = useUserReferrals(user.id);

  return (
    <div className="relative inline-block">
      <Avatar className={cn(sizeMap[size], className)}>
        <AvatarImage src={user.avatar ? pb.files.getURL(user, user.avatar, { thumb: '100x100' }) : undefined} />
        <AvatarFallback>{user.name?.[0]}</AvatarFallback>
      </Avatar>
      {!isLoading && (
        <div className="absolute -bottom-1 -right-1">
          <TierBadge tier={referrals?.tier} showLabel={false} size="xs" className="ring-2 ring-card" />
        </div>
      )}
    </div>
  );
}
