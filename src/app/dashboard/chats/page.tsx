'use client';

import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Chat from '$/components/Chat';
import { usePocket } from '$/components/PocketContext';
import { cn } from '$/utils/cn';
import { Collections, UsersResponse } from '$/utils/pocketbase-types';
import { ChatsResponse } from '$/utils/pocketbase-types';
import { Thumb } from '$/utils/thumbs';

type Chat = ChatsResponse<{ users: UsersResponse[] }>;

function page() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const { pb, user } = usePocket();

  const p = useSearchParams();

  useEffect(() => {
    const getChats = async () => {
      const c = await pb.collection(Collections.Chats).getFullList<Chat>({
        expand: 'users',
      });
      setChats(c);

      if (p.get('id')) {
        const chat = c.find((c) => c.id === p.get('id'));
        if (chat) setSelectedChat(chat);
      }
    };

    getChats();
  }, []);

  return (
    <div className="grid grid-cols-[1fr,5fr] rounded-lg h-[80vh] grid-rows-[1fr,60px] bg-rg-darkest">
      <div className="row-span-2 border-r border-rg-dark">
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
                      thumb: Thumb.avatar,
                    })}
                    alt={otherUser?.username}
                  />
                ) : (
                  <UserCircleIcon className="w-16 h-16 text-rg" />
                )}
              </div>
              <div className="text-lg text-rg-lightest">
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
