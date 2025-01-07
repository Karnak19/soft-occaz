import { Medal } from 'lucide-react';

import { cn } from '$/utils/cn';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

type TierBadgeProps = {
  tier?: 'master' | 'gold' | 'silver' | 'bronze' | 'none';
  className?: string;
  showLabel?: boolean;
  size?: 'xs' | 'md';
};

const tierConfig = {
  master: {
    label: 'Master',
    icon: Medal,
    className: 'bg-gradient-to-r from-purple-500 to-purple-900 text-white',
    description: 'Vous avez référé 25 utilisateurs',
  },
  gold: {
    label: 'Gold',
    icon: Medal,
    className: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black',
    description: 'Vous avez référé 10 utilisateurs',
  },
  silver: {
    label: 'Silver',
    icon: Medal,
    className: 'bg-gradient-to-r from-gray-300 to-gray-500 text-black',
    description: 'Vous avez référé 5 utilisateurs',
  },
  bronze: {
    label: 'Bronze',
    icon: Medal,
    className: 'bg-gradient-to-r from-amber-600 to-amber-800 text-white',
    description: 'Vous avez référé 1 utilisateur',
  },
} as const;

export default function TierBadge({ tier, className, showLabel = false, size = 'md' }: TierBadgeProps) {
  if (!tier || tier === 'none') return null;

  const config = tierConfig[tier];
  const Icon = config.icon;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={cn(
              'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
              size === 'xs' ? 'grid place-items-center p-1' : 'px-2 py-1',
              config.className,
              className,
            )}
          >
            <Icon className={cn(size === 'xs' ? 'size-2' : 'size-3')} strokeWidth={size === 'xs' ? 1.25 : 2} />
            {showLabel && <span>{config.label}</span>}
          </div>
        </TooltipTrigger>
        <TooltipContent className={cn('text-xs', config.className)}>
          <p>{config.label}</p>
          <p>{config.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
