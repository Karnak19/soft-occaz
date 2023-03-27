import { ChatBubbleLeftRightIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';

import { cn } from '$/utils/cn';
import { ChatsResponse, Collections, UsersResponse } from '$/utils/pocketbase-types';

import { usePocket } from './PocketContext';

function UserCard({ user }: { user?: UsersResponse }) {
  const router = useRouter();

  const { user: me, pb } = usePocket();

  if (!user) {
    return null;
  }

  const createChatAndRedirect = async (userId: string) => {
    const existingChats = await pb.collection(Collections.Chats).getFullList<ChatsResponse>();

    const doesChatExist = existingChats.find((chat) => chat.users.includes(userId));

    if (doesChatExist) {
      return router.push(`/dashboard/chats?id=${doesChatExist.id}`);
    }

    const newChat = await pb.collection(Collections.Chats).create<ChatsResponse>({
      users: [userId, me?.id],
    });

    return router.push(`/dashboard/chats?id=${newChat.id}`);
  };

  const avatar = pb.getFileUrl(user, user.avatar ?? '', {
    thumb: '100x100',
  });

  return (
    <div className="col-span-1 divide-y rounded-lg shadow divide-slate-700 bg-slate-800">
      <div className="flex items-center justify-between w-full p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="font-medium truncate text-slate-50">{user.username}</h3>
            <span
              className={cn('inline-block flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium', {
                'bg-red-200 text-red-800': !user.verified,
                'bg-green-200 text-green-800': user.verified,
              })}
            >
              {user.verified ? 'Verified' : 'Not verified'}
            </span>
          </div>
        </div>
        <img className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-700" src={avatar} alt="" />
      </div>
      <div>
        <div className="flex -mt-px divide-x divide-slate-700">
          <div className="flex flex-1 w-0">
            <button
              disabled={user.id === me?.id}
              onClick={() => createChatAndRedirect(user.id)}
              className="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-semibold border border-transparent rounded-bl-lg hover:bg-sky-700 hover:text-slate-50 group gap-x-3 disabled:opacity-20 disabled:hover:cursor-not-allowed"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5 text-slate-400 group-hover:text-slate-50" aria-hidden="true" />
              Chat
            </button>
          </div>
          <div className="flex flex-1 w-0 -ml-px">
            <a
              href={`/annonces`}
              className="relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-semibold border border-transparent rounded-br-lg hover:bg-sky-700 hover:text-slate-50 group gap-x-3"
            >
              <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 group-hover:text-slate-50" aria-hidden="true" />
              Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
