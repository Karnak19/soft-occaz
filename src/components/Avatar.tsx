import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';

import { cn } from '$/utils/cn';

function Avatar({ src, className }: { src?: string | null; className?: string }) {
  return src ? (
    <img className={cn('size-8 rounded-full', className)} src={src} alt="" />
  ) : (
    <UserCircleIcon className={cn('size-8 text-primary', className)} />
  );
}

export default Avatar;
