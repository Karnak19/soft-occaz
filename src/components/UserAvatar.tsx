'use client';

import { usePocketbase, useUserReferrals } from '$/app/pocketbase-provider';
import { Avatar, AvatarFallback, AvatarImage } from '$/components/ui/avatar';
import { cn } from '$/utils/cn';
import { isMarketBot } from '$/utils/market-bot';
import { UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { Bot } from 'lucide-react';

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

const botBadgeSizeMap = {
  sm: 'size-3',
  md: 'size-4',
  lg: 'size-5',
} as const;

export default function UserAvatar({ user, size = 'md', className }: UserAvatarProps) {
  const { pb } = usePocketbase();
  const { data: referrals, isLoading } = useUserReferrals(user.id);
  const isBot = isMarketBot(user.id);

  return (
    <div className="relative inline-block">
      <Avatar className={cn(sizeMap[size], className)}>
        <AvatarImage src={user.avatar ? pb.files.getURL(user, user.avatar, { thumb: '100x100' }) : undefined} />
        <AvatarFallback>{user.name?.[0]}</AvatarFallback>
      </Avatar>

      {isBot ? (
        <div className="absolute -bottom-1 -right-1">
          <div
            className={cn(
              'flex items-center justify-center rounded-full bg-yellow-400 text-yellow-900',
              botBadgeSizeMap[size],
              'ring-2 ring-background',
            )}
          >
            <Bot className={cn(size === 'sm' ? 'size-2' : size === 'md' ? 'size-3' : 'size-4')} />
          </div>
        </div>
      ) : (
        !isLoading &&
        referrals?.tier && (
          <div className="absolute -bottom-1 -right-1">
            <TierBadge tier={referrals.tier} showLabel={false} size="xs" className="ring-2 ring-card" />
          </div>
        )
      )}
    </div>
  );
}
