import { CheckBadgeIcon } from '@heroicons/react/20/solid';

import { pb } from '$/utils/pocketbase';
import { UsersResponse } from '$/utils/pocketbase-types';
import { Thumb } from '$/utils/thumbs';

function ProductCardUserInfos(props: UsersResponse) {
  return (
    <div className="flex items-center h-full gap-5 rounded">
      <div className="w-8 h-8 overflow-hidden border rounded-full border-rg-lightest">
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
          <CheckBadgeIcon className="w-5 h-5 text-green-600" />
        </span>
      )}
    </div>
  );
}

export default ProductCardUserInfos;
