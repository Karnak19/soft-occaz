import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import UserAvatar from '$/components/UserAvatar';
import { Button } from '$/components/ui/button';
import { useIsMobile } from '$/hooks/use-mobile';
import { type UsersResponse } from '$/utils/pocketbase/pocketbase-types';

type ChatHeaderProps = {
  chatId: string;
  title: string;
  recipient?: UsersResponse;
};

export function ChatHeader({ chatId, title, recipient }: ChatHeaderProps) {
  const isMobile = useIsMobile();
  const router = useRouter();

  return (
    <div className="flex-none border-b p-4">
      <div className="flex items-center space-x-4">
        {isMobile && chatId && (
          <Button variant="ghost" size="icon" className="size-10" onClick={() => router.push('/dashboard/chats')}>
            <ArrowLeft className="size-6" />
          </Button>
        )}
        {recipient && <UserAvatar user={recipient} size="md" />}
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">2 participants</p>
        </div>
      </div>
    </div>
  );
}
