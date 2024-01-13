'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useChat } from './useChat';
import { ScrollArea } from '$/components/ui/scroll-area';
import { MyForm } from '$/components/Form/core/mapping';
import { Button } from '$/components/ui/button';
import { cn } from '$/utils/cn';
import { User } from '@prisma/client';
import { useSearchParams } from 'next/navigation';

const ChatFormSchema = z.object({
  message: z.string().min(1),
});

export function ClientSideChat({ user }: { user: User }) {
  const params = useSearchParams();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof ChatFormSchema>>({
    resolver: zodResolver(ChatFormSchema),
  });

  const { messages, sendMessage } = useChat({ myId: user.id, id: params.get('chat') ?? 'default' });

  const onSubmit = async (values: z.infer<typeof ChatFormSchema>) => {
    form.reset();
    await sendMessage(values.message);
  };

  // scroll to bottom when new message
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <ScrollArea className="p-2 xl:p-4 flex-1" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg, i) => {
            return (
              <div
                key={i}
                className={cn(
                  'flex max-w-sm flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                  msg.mine ? 'ml-auto dark:bg-primary dark:text-primary-foreground bg-rg-400 text-foreground' : 'bg-muted',
                )}
              >
                <span>{msg.message}</span>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <div className="p-4">
        <MyForm
          formProps={{
            className: 'w-full flex gap-x-2 [&>*:first-child]:flex-1',
          }}
          form={form}
          schema={ChatFormSchema}
          onSubmit={onSubmit}
          renderAfter={() => (
            <div>
              <Button type="submit" disabled={!params.get('chat') || form.formState.isSubmitting}>
                Envoyer
              </Button>
            </div>
          )}
        >
          {({ message }) => {
            if (!params.get('chat')) {
              return <fieldset disabled>{message}</fieldset>;
            }
            return <>{message}</>;
          }}
        </MyForm>
      </div>
    </>
  );
}
