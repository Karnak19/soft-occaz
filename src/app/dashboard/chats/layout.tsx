import type { PropsWithChildren } from 'react';
import { cookies } from 'next/headers';
import { currentUser } from '@clerk/nextjs';
import { User } from '@prisma/client';

import { prisma } from '$/utils/db';
import { Card } from '$/components/ui/card';

import { ChatsList, CollapsedChatsList } from './Lists';
import { Panels } from './Panels';
import Providers from './providers';

export default async function ChatLayout({ children }: PropsWithChildren) {
  const _user = await currentUser();

  if (!_user) {
    throw new Error('User not found');
  }

  const layout = cookies().get('layout');

  const defaultLayout = layout ? JSON.parse(layout.value) : [25, 75];

  const chats = await prisma.usersChat.findMany({
    where: {
      users: { some: { clerkId: _user.id } },
    },
    include: { users: true },
  });

  const mappedChats = chats.map((c) => {
    const { users, ...rest } = c;
    return {
      ...rest,
      user: users.find((u) => u.clerkId !== _user.id) as User,
    };
  });

  const chatsList = <ChatsList chats={mappedChats} />;

  const collapsedChatsList = <CollapsedChatsList chats={mappedChats} />;

  return (
    <Providers>
      <Card className="h-[30rem]">
        <Panels layout={defaultLayout} chatsList={chatsList} collapsedChatsList={collapsedChatsList}>
          {children}
        </Panels>
      </Card>
    </Providers>
  );
}
