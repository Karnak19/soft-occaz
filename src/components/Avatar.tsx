import { UserCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

import { cn } from '$/utils/cn';

function Avatar({ src, className }: { src?: string | null; className?: string }) {
  return src ? (
    <img className={cn('w-8 h-8 rounded-full', className)} src={src} alt="" />
  ) : (
    <UserCircleIcon className={cn('w-8 h-8 text-rg', className)} />
  );
}

export default Avatar;
