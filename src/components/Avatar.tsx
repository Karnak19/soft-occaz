import { CircleUserRoundIcon } from 'lucide-react';

import { cn } from '$/utils/cn';

function Avatar({ src, className }: { src?: string | null; className?: string }) {
  return src ? (
    <img className={cn('size-12 rounded-full', className)} src={src} alt="" />
  ) : (
    <CircleUserRoundIcon className={cn('size-12 text-primary', className)} />
  );
}

export default Avatar;
