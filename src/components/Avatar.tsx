import { UserCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

import { cn } from '$/utils/cn';

function Avatar({ src, className }: { src?: string | null; className?: string }) {
  return src ? (
    <img className={cn('size-8 rounded-full', className)} src={src} alt="" />
  ) : (
    <UserCircleIcon className={cn('size-8 text-rg-500', className)} />
  );
}

export default Avatar;
