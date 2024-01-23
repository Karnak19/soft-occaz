import { TruckIcon } from '@heroicons/react/20/solid';

import { cn } from '$/utils/cn';

import { baseBadgeClasses } from './Badge';

export function SendBadge(props: { send?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        baseBadgeClasses,
        {
          'bg-red-200 text-red-800': !props.send,
          'bg-green-200 text-green-800': props.send,
        },
        props.className,
      )}
    >
      <TruckIcon className="mr-1 size-4" aria-hidden="true" />
      Envoi
    </span>
  );
}
