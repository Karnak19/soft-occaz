'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';

import { Button } from '$/components/ui/button';
import { Input } from '$/components/ui/input';
import { Label } from '$/components/ui/label';

import { login } from './actions';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function PasswordForm() {
  const { execute, isPending, error } = useServerAction(login);

  const form = useForm<{ email: string; password: string }>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: z.infer<typeof schema>) => execute(data);

  return (
    <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
      <pre>{JSON.stringify(error, null, 2)}</pre>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="nom@exemple.com" required {...form.register('email')} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input id="password" type="password" required {...form.register('password')} />
      </div>
      <Button type="submit" disabled={isPending}>
        Se connecter
      </Button>
    </form>
  );
}
