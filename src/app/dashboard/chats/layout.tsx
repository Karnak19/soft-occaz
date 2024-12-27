'use client';

import { useParams } from 'next/navigation';

import { cn } from '$/utils/cn';
import { useIsMobile } from '$/hooks/use-mobile';
import { usePocketbaseAuth } from '$/hooks/usePocketbaseAuth';
import { Card } from '$/components/ui/card';

import { ConversationList } from './ConversationList';

export default function ChatsLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const isAuthenticated = usePocketbaseAuth();
  const params = useParams();
  const chatId = params?.chatId as string | undefined;

  if (!isAuthenticated) {
    return (
      <div className="flex h-[calc(100vh-12rem)] items-center justify-center">
        <Card className="p-4">
          <p className="text-center text-sm text-muted-foreground">Connecting to chat service...</p>
        </Card>
      </div>
    );
  }

  return (
    <Card className="grid h-full min-h-[500px] grid-cols-1 md:grid-cols-7 lg:grid-cols-5">
      {/* Chat list sidebar */}
      <aside
        className={cn('h-full border-r', {
          hidden: isMobile && chatId,
          block: isMobile && !chatId,
          'col-span-2 lg:col-span-1': !isMobile,
        })}
      >
        <div className="h-full rounded-none border-0">
          <div className="flex h-full flex-col">
            <div className="border-b p-4">
              <h2 className="text-lg font-semibold">Messages</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ConversationList />
            </div>
          </div>
        </div>
      </aside>

      {/* Main chat area */}
      <main
        className={cn('flex h-full flex-col', {
          hidden: isMobile && !chatId,
          block: isMobile && chatId,
          'col-span-5 lg:col-span-4': !isMobile,
        })}
      >
        {children}
      </main>
    </Card>
  );
}
