import { ChatBubbleLeftRightIcon, CheckBadgeIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { ChatsResponse, Collections, UsersResponse } from '$/utils/pocketbase-types';

import Avatar from './Avatar';
import { usePocket } from './PocketContext';
import Spinner from './Spinner';

function UserCard({ user }: { user?: UsersResponse }) {
  const router = useRouter();

  const { user: me, pb } = usePocket();

  if (!user) {
    return null;
  }

  const mutation = useMutation({
    mutationFn: async (users: string[]) => {
      const chat = await pb.collection(Collections.Chats).create<ChatsResponse>({
        users,
      });
      return chat;
    },
  });

  const createChatAndRedirect = async (userId: string) => {
    const existingChats = await pb.collection(Collections.Chats).getFullList<ChatsResponse>();

    const doesChatExist = existingChats.find((chat) => chat.users.includes(userId));

    if (doesChatExist) {
      return router.push(`/dashboard/chats?id=${doesChatExist.id}`);
    }

    const newChat = await mutation.mutateAsync([userId, me?.id]);

    return router.push(`/dashboard/chats?id=${newChat.id}`);
  };

  return (
    <div className="col-span-1 divide-y rounded-lg shadow shadow-gray-400 divide-rg-dark bg-rg-light">
      <div className="flex items-center justify-between w-full p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="font-bold truncate text-rg-darkest font-roboto">{user.username}</h3>
            {user.verified ? (
              <CheckBadgeIcon className="w-6 h-6 text-white" />
            ) : (
              <span className="inline-block flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium bg-red-200 text-red-800">
                Not verified
              </span>
            )}
          </div>
        </div>
        <Avatar user={user} className="flex-shrink-0 w-10 h-10 border rounded-full border-rg bg-rg-dark" />
      </div>
      <div>
        <div className="flex -mt-px divide-x divide-rg-dark">
          <div className="relative flex flex-1 w-0">
            <button
              disabled={user.id === me?.id || mutation.isLoading}
              onClick={() => createChatAndRedirect(user.id)}
              className="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px font-semibold border border-transparent rounded-bl-lg hover:bg-rg hover:text-rg-lightest group gap-x-3 disabled:opacity-20 disabled:hover:cursor-not-allowed"
            >
              {mutation.isLoading && <Spinner />}
              <ChatBubbleLeftRightIcon className="w-5 h-5 text-rg group-hover:text-rg-lightest" aria-hidden="true" />
              Chat
            </button>
          </div>
          <div className="flex flex-1 w-0 -ml-px">
            <a
              href={`/annonces`}
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
