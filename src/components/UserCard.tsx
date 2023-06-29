import { ChatBubbleLeftRightIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { CheckBadgeIcon } from '@heroicons/react/20/solid';
import { User } from '@prisma/client';

import Avatar from './Avatar';

function UserCard(props: User) {
  return (
    <div className="col-span-1 divide-y rounded-lg shadow shadow-gray-400 divide-rg-dark bg-rg-light">
      <div className="flex items-center justify-between w-full p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="font-bold truncate text-rg-darkest font-roboto">{props.username}</h3>
            <CheckBadgeIcon className="w-6 h-6 text-white" />
          </div>
        </div>
        <Avatar src={props.avatar} className="flex-shrink-0 w-10 h-10 border rounded-full border-rg bg-rg-dark" />
      </div>
      <div>
        <div className="flex -mt-px divide-x divide-rg-dark">
          <div className="relative flex flex-1 w-0">
            <button
              disabled
              // disabled={user.id === me?.id || mutation.isLoading}
              // onClick={() => createChatAndRedirect(user.id)}
              className="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px font-semibold border border-transparent rounded-bl-lg hover:bg-rg hover:text-rg-lightest group gap-x-3 disabled:opacity-20 disabled:hover:cursor-not-allowed"
            >
              {/* {mutation.isLoading && <Spinner />} */}
              <ChatBubbleLeftRightIcon className="w-5 h-5 text-rg group-hover:text-rg-lightest" aria-hidden="true" />
              Chat
            </button>
          </div>
          <div className="flex flex-1 w-0 -ml-px">
            <a
              href={`/profile/${props.id}`}
              className="relative inline-flex items-center justify-center flex-1 w-0 py-4 font-semibold border border-transparent rounded-br-lg hover:bg-rg hover:text-rg-lightest group gap-x-3"
            >
              <MagnifyingGlassIcon className="w-5 h-5 text-rg group-hover:text-rg-lightest" aria-hidden="true" />
              Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
