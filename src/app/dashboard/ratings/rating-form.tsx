'use client';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

import { MyFormWithTemplate } from '$/components/Form/core/mapping';
import UserAvatar from '$/components/UserAvatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$/components/ui/card';
import { useToast } from '$/components/ui/use-toast';
import { useServerActionMutation } from '$/hooks/zsa';
import { cn } from '$/utils/cn';
import type { RatingSessionsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';

import { createRatingAction } from './actions';
import { ratingSchema } from './schema';
import type { RatingSchema } from './schema';

function RatingForm(props: RatingSessionsResponse<{ target: UsersResponse }>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const qc = useQueryClient();

  const { mutate, status } = useServerActionMutation(createRatingAction, {
    onSuccess: () => {
      toast({ title: 'Note envoyée', description: 'La note a bien été envoyée' });
      router.refresh();
      qc.invalidateQueries({ queryKey: ['rating-sessions'] });
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
      <CardHeader className="grid grid-cols-[auto_1fr] grid-rows-2 place-items-center gap-x-2">
        {props.expand?.target && <UserAvatar user={props.expand?.target} size="lg" />}
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
