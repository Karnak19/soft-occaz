'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Prisma } from '@prisma/client';
import { useAction } from 'next-safe-action/hooks';
import { z } from 'zod';

import { cn } from '$/utils/cn';
import { Avatar, AvatarFallback, AvatarImage } from '$/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$/components/ui/card';
import { useToast } from '$/components/ui/use-toast';
import { MyFormWithTemplate } from '$/components/Form/core/mapping';

import { createRatingAction } from './action';
import { ratingSchema } from './schema';

function RatingForm(props: Prisma.RatingCreatorSessionGetPayload<{ include: { target: true } }>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { execute, status } = useAction(createRatingAction);

  const onSubmit = async (values: z.infer<typeof ratingSchema>) => {
    await execute({ rating: values.rating, comment: values.comment, sessionId: props.id });
    toast({ title: 'Note envoyée', description: 'La note a bien été envoyée' });
    router.replace('/dashboard/ratings');
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
          <AvatarFallback>{props.target.firstName[0]}</AvatarFallback>
          {props.target.avatar && <AvatarImage src={props.target.avatar} alt={props.target.firstName} />}
        </Avatar>
        <CardTitle>{props.target.username}</CardTitle>
        <CardDescription>{props.target.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <MyFormWithTemplate
          schema={ratingSchema}
          onSubmit={onSubmit}
          formProps={{
            submitButtonProps: { children: 'Envoyer', disabled: status === 'executing' },
          }}
        />
      </CardContent>
    </Card>
  );
}

export default RatingForm;
