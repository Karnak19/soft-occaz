'use client';

import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

import Chat from '$/components/Chat';
import { usePocket } from '$/components/PocketContext';
import { cn } from '$/utils/cn';
import { Collections, UsersResponse } from '$/utils/pocketbase-types';
import { ChatsResponse } from '$/utils/pocketbase-types';

type Chat = ChatsResponse<{ users: UsersResponse[] }>;

function page() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const { pb, user } = usePocket();

  useEffect(() => {
    const getChats = async () => {
      const c = await pb.collection(Collections.Chats).getFullList<Chat>({
        expand: 'users',
      });
      setChats(c);
    };

    getChats();
  }, []);

  return (
    <div className="grid grid-cols-[1fr,5fr] rounded-lg h-[80vh] grid-rows-[1fr,60px] bg-slate-800">
      <div className="row-span-2 border-r border-slate-700">
        {chats.map((chat) => {
          const otherUser = chat.expand?.users.find((u) => u.id !== user.id) as UsersResponse;

          return (
            <button
              key={chat.id}
              className={cn('flex items-center rounded-l-lg w-full gap-3', {
                'bg-sky-600': selectedChat?.id === chat.id,
              })}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="flex flex-col items-center justify-center w-20 h-20">
                {otherUser.avatar ? (
                  <img
                    className="w-16 h-16 rounded-full"
                    src={pb.getFileUrl(otherUser, otherUser?.avatar, {
                      thumb: '100x100',
                    })}
                    alt={otherUser?.username}
                  />
                ) : (
                  <UserCircleIcon className="w-16 h-16 text-slate-500" />
                )}
              </div>
              <div className="text-lg text-slate-100">
                <p>{otherUser?.username}</p>
              </div>
            </button>
          );
        })}
      </div>

      {selectedChat && <Chat {...selectedChat} />}
    </div>
  );
}

export default page;
