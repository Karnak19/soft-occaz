'use client';

import { useMutation } from '@tanstack/react-query';
import formatDistance from 'date-fns/formatDistance';
import fr from 'date-fns/locale/fr';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { cn } from '$/utils/cn';
import { ChatsResponse, Collections, MessagesResponse } from '$/utils/pocketbase-types';

import Button from './Button';
import { usePocket } from './PocketContext';

type FormData = {
  content: string;
};

function Chat(props: ChatsResponse) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<MessagesResponse[]>([]);

  const { pb, user } = usePocket();

  const { handleSubmit, register, reset } = useForm<FormData>();
  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const formData = new FormData();
      formData.append('content', data.content);
      formData.append('chat', props.id);
      formData.append('author', user.id);

      await pb.collection(Collections.Messages).create(formData);

      reset();
    },
  });

  const scroll = () => {
    // delay 50ms
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight - 100;
      }
    }, 50);
  };

  useEffect(() => {
    const getMessages = async () => {
      const m = await pb.collection(Collections.Messages).getFullList<MessagesResponse>({
        sort: '+created',
        filter: `chat = "${props.id}"`,
      });
      setMessages(m);

      scroll();
    };

    getMessages();

    pb.collection(Collections.Messages).subscribe<MessagesResponse>('*', (e) => {
      setMessages((prev) => {
        if (e.record.chat !== props.id) return prev;

        return [...prev, e.record];
      });

      scroll();
    });

    return () => {
      pb.collection(Collections.Messages).unsubscribe('*');
    };
  }, [props.id]);

  return (
    <>
      <div ref={ref} className="flex flex-col gap-2 overflow-y-scroll">
        {messages.map((message) => {
          return (
            <div
              key={message.id}
              className={cn('flex gap-5 p-3 transition-all ', {
                'justify-end': message.author === user.id,
                'justify-start': message.author !== user.id,
              })}
            >
              <div className="flex flex-col">
                <div
                  className={cn('p-3 rounded w-96', {
                    'bg-sky-300 text-slate-900': message.author === user.id,
                    'bg-rg text-rg-lightest': message.author !== user.id,
                  })}
                >
                  <p>{message.content}</p>
                </div>
                <div className="text-xs">
                  <p>{formatDistance(new Date(message.created), new Date(), { addSuffix: true, locale: fr })}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="col-start-2 border-t border-rg-dark">
        <form className="flex w-full h-full p-4" onSubmit={handleSubmit((d) => mutation.mutate(d))}>
          <input
            placeholder="Tapez votre message ici..."
            className="w-full h-full bg-transparent border-none"
            type="text"
            autoCapitalize="sentences"
            autoComplete="off"
            {...register('content')}
          />
          <Button type="submit">Envoyer</Button>
        </form>
      </div>
    </>
  );
}

export default Chat;
