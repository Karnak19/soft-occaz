'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import Avatar from '$/components/Avatar';
import Chat from '$/components/Chat';
import { useGetChats } from '$/hooks/useGetChats';
import { cn } from '$/utils/cn';
import { UsersResponse } from '$/utils/pocketbase-types';
import { ChatsResponse } from '$/utils/pocketbase-types';

type Chat = ChatsResponse<{ users: UsersResponse[] }>;

function page() {
  const [selectedChat, setSelectedChat] = useState(null as Chat | null);
  const p = useSearchParams();

  const { data } = useGetChats((d) => {
    const chat = d.items.find((c) => c.id === p.get('id'));
    if (chat) {
      setSelectedChat(chat);
    }
  });

  return (
    <div className="grid grid-cols-[1fr,5fr] bg-white shadow rounded-lg h-[50vh] grid-rows-[1fr,60px]">
      <div className="row-span-2 border-r border-rg-dark bg-rg-lightest">
        {data?.items.map((chat) => {
          return (
            <button
              key={chat.id}
              className={cn('flex items-center rounded-l-lg w-full gap-3', {
                'bg-rg-light': selectedChat?.id === chat.id,
              })}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="flex flex-col items-center justify-center px-1 py-2">
                <Avatar user={chat.otherUser} className="w-8 h-8" />
              </div>
              <div className="text-base text-rg-dark">
                <p>{chat.otherUser?.username}</p>
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
