'use client';

import { useParams } from 'next/navigation';

import { cn } from '$/utils/cn';
import { useIsMobile } from '$/hooks/use-mobile';
import { Card } from '$/components/ui/card';
import { NewChatAnnouncementModal } from '$/components/NewChatAnnouncementModal';
import { useUser } from '$/app/pocketbase-provider';

import { ConversationList } from './ConversationList';

export default function ChatsLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const user = useUser();
  const params = useParams();
  const chatId = params?.chatId as string | undefined;

  if (!user) {
    return (
      <div className="flex h-[calc(100vh-12rem)] items-center justify-center">
        <Card className="p-4">
          <p className="text-center text-sm text-muted-foreground">Connecting to chat service...</p>
        </Card>
      </div>
    );
  }

  return (
    <>
      <NewChatAnnouncementModal />
      <Card className="grid h-[calc(100vh-12rem)] grid-cols-1 md:h-[500px] md:grid-cols-7 lg:grid-cols-5">
        {/* Chat list sidebar */}
        <aside
          className={cn('h-full overflow-hidden border-r', {
            hidden: isMobile && chatId,
            block: isMobile && !chatId,
            'col-span-2 lg:col-span-1': !isMobile,
          })}
        >
          <div className="flex h-full flex-col">
            <div className="border-b p-4">
              <h2 className="text-lg font-semibold">Messages</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ConversationList />
            </div>
          </div>
        </aside>

        {/* Main chat area */}
        <main
          className={cn('flex h-full flex-col overflow-hidden', {
            hidden: isMobile && !chatId,
            block: isMobile && chatId,
            'col-span-5 lg:col-span-4': !isMobile,
          })}
        >
          {children}
        </main>
      </Card>
    </>
  );
}
