import { CheckBadgeIcon } from '@heroicons/react/20/solid';
import { User } from '@prisma/client';
import Link from 'next/link';

async function ProductCardUserInfos({ avatar, username, id }: User) {
  return (
    <div className="relative flex items-center gap-5 rounded pointer-events-none hover:bg-rg-light p-1">
      <div className="w-8 h-8 overflow-hidden border rounded-full border-rg-lightest">
        {avatar && <img src={avatar} alt="" />}
      </div>
      <Link href={`/profile/${id}`}>
        <span className="absolute z-50 inset-0 pointer-events-auto" aria-hidden />
        {username}
      </Link>
      <span>
        <CheckBadgeIcon className="w-5 h-5 text-green-600" />
      </span>
    </div>
  );
}

export default ProductCardUserInfos;
