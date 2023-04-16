import { UserCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

import { cn } from '$/utils/cn';
import { pb } from '$/utils/pocketbase';
import { UsersResponse } from '$/utils/pocketbase-types';
import { Thumb } from '$/utils/thumbs';

function Avatar({ user, className }: { user?: UsersResponse; className?: string }) {
  return user?.avatar ? (
    <img
      className={cn('h-8 w-8 rounded-full', className)}
      src={pb.getFileUrl(user, user.avatar, { thumb: Thumb.avatar })}
      alt=""
    />
  ) : (
    <UserCircleIcon className={cn('h-8 w-8 text-rg', className)} />
  );
}

export default Avatar;
