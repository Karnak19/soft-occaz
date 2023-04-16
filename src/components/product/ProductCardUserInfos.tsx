import { CheckBadgeIcon } from '@heroicons/react/20/solid';

import { pb } from '$/utils/pocketbase';
import { UsersResponse } from '$/utils/pocketbase-types';
import { Thumb } from '$/utils/thumbs';

function ProductCardUserInfos(props: UsersResponse) {
  return (
    <div className="flex h-full items-center gap-5 rounded">
      <div className="h-8 w-8 overflow-hidden rounded-full border border-rg-lightest">
        <img
          src={pb.getFileUrl(props, props.avatar ?? '', {
            thumb: Thumb.avatar,
          })}
          alt=""
        />
      </div>
      <p>{props.username}</p>
      {props.verified && (
        <span>
          <CheckBadgeIcon className="h-5 w-5 text-green-600" />
        </span>
      )}
    </div>
  );
}

export default ProductCardUserInfos;
