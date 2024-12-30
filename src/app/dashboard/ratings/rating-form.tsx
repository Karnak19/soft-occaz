'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { cn } from '$/utils/cn';
import type { RatingSessionsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { useServerActionMutation } from '$/hooks/zsa';
import { Avatar, AvatarFallback, AvatarImage } from '$/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$/components/ui/card';
import { useToast } from '$/components/ui/use-toast';
import { MyFormWithTemplate } from '$/components/Form/core/mapping';
import { usePocketbase } from '$/app/pocketbase-provider';

import { createRatingAction } from './actions';
import { ratingSchema } from './schema';
import type { RatingSchema } from './schema';

function RatingForm(props: RatingSessionsResponse<{ target: UsersResponse }>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { pb } = usePocketbase();

  const { mutate, status } = useServerActionMutation(createRatingAction, {
    onSuccess: () => {
      toast({ title: 'Note envoyée', description: 'La note a bien été envoyée' });
      router.replace('/dashboard/ratings');
    },
  });

  const onSubmit = async (values: RatingSchema) => {
    await mutate({ ...values, sessionId: props.id });
  };

  const isSelected = searchParams.get('id') === props.id;

  return (
    <Card
      key={props.id}
      className={cn('border-primary', {
        'border-4': isSelected,
        'border-primary/50': !isSelected,
      })}
    >
      <CardHeader className="grid grid-cols-[auto,1fr] grid-rows-2 place-items-center gap-x-2">
        <Avatar className="row-span-2">
          <AvatarFallback>{props.expand?.target.name[0]}</AvatarFallback>
          {props.expand?.target && (
            <AvatarImage
              {...{
                src: pb.files.getURL(props.expand?.target, props.expand?.target.avatar, { thumb: '100x100' }),
                alt: props.expand?.target.name,
              }}
            />
          )}
        </Avatar>
        <CardTitle>{props.expand?.target.name}</CardTitle>
        <CardDescription>{props.expand?.target.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <MyFormWithTemplate
          schema={ratingSchema}
          onSubmit={onSubmit}
          formProps={{
            submitButtonProps: { children: 'Envoyer', disabled: status === 'pending' },
          }}
        />
      </CardContent>
    </Card>
  );
}

export default RatingForm;
