import { useRouter } from 'next/navigation';
import { ArrowLeft, UserCircle2Icon } from 'lucide-react';

import { type UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { useIsMobile } from '$/hooks/use-mobile';
import { Avatar } from '$/components/ui/avatar';
import { Button } from '$/components/ui/button';
import { usePocketbase } from '$/app/pocketbase-provider';

type ChatHeaderProps = {
  chatId: string;
  title: string;
  recipient?: UsersResponse;
};

export function ChatHeader({ chatId, title, recipient }: ChatHeaderProps) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { pb } = usePocketbase();
  const avatar = recipient ? pb.files.getURL(recipient, recipient.avatar) : undefined;

  return (
    <div className="flex-none border-b p-4">
      <div className="flex items-center space-x-4">
        {isMobile && chatId && (
          <Button variant="ghost" size="icon" className="size-10" onClick={() => router.push('/dashboard/chats')}>
            <ArrowLeft className="size-6" />
          </Button>
        )}
        <Avatar className="size-10">
          {avatar ? <img src={avatar} alt="" className="size-full object-cover" /> : <UserCircle2Icon className="size-full" />}
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">2 participants</p>
        </div>
      </div>
    </div>
  );
}
