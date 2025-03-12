import { UserCheck } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '$/components/ui/tooltip';
import { cn } from '$/utils/cn';

interface RecommendedBadgeProps {
  showLabel?: boolean;
  size?: 'xs' | 'md';
  className?: string;
}

const config = {
  label: 'Recommandé',
  icon: UserCheck,
  className: 'bg-linear-to-r from-green-500 to-emerald-500 text-white',
  description: 'Nouveau membre recommandé',
} as const;

export default function RecommendedBadge({ showLabel = false, size = 'md', className }: RecommendedBadgeProps) {
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
            <Icon className={cn(size === 'xs' ? 'size-2' : 'size-3', 'text-black')} strokeWidth={size === 'xs' ? 1.25 : 2} />
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
