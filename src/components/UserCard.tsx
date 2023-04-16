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
    <div className="col-span-1 divide-y divide-rg-dark rounded-lg bg-rg-light shadow shadow-gray-400">
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate font-roboto font-bold text-rg-darkest">{user.username}</h3>
            {user.verified ? (
              <CheckBadgeIcon className="h-6 w-6 text-white" />
            ) : (
              <span className="inline-block flex-shrink-0 rounded-full bg-red-200 px-2 py-0.5 text-xs font-medium text-red-800">
                Not verified
              </span>
            )}
          </div>
        </div>
        <Avatar user={user} className="h-10 w-10 flex-shrink-0 rounded-full border border-rg bg-rg-dark" />
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-rg-dark">
          <div className="relative flex w-0 flex-1">
            <button
              disabled={user.id === me?.id || mutation.isLoading}
              onClick={() => createChatAndRedirect(user.id)}
              className="group relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 font-semibold hover:bg-rg hover:text-rg-lightest disabled:opacity-20 disabled:hover:cursor-not-allowed"
            >
              {mutation.isLoading && <Spinner />}
              <ChatBubbleLeftRightIcon className="h-5 w-5 text-rg group-hover:text-rg-lightest" aria-hidden="true" />
              Chat
            </button>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <a
              href={`/annonces`}
              className="group relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 font-semibold hover:bg-rg hover:text-rg-lightest"
            >
              <MagnifyingGlassIcon className="h-5 w-5 text-rg group-hover:text-rg-lightest" aria-hidden="true" />
              Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
