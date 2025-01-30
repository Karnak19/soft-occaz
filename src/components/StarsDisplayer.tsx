import { StarIcon } from '@heroicons/react/24/solid';

import { cn } from '$/utils/cn';

export default function StarsDisplayer({
  average,
  size = 'md',
  className,
  iconClassName,
}: {
  size?: 'sm' | 'md' | 'lg';
  average: number;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div className={cn('flex gap-1', className)}>
      {[0, 1, 2, 3, 4].map((rating) => (
        <StarIcon
          key={rating}
          className={cn(
            average > rating ? 'text-yellow-400' : 'text-muted-foreground',
            'shrink-0',
            {
              'h-4 w-4': size === 'sm',
              'h-5 w-5': size === 'md',
              'h-6 w-6': size === 'lg',
            },
            iconClassName,
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
