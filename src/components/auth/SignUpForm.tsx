'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';

import { Button } from '$/components/ui/button';
import { Input } from '$/components/ui/input';
import { Label } from '$/components/ui/label';

import { register } from './actions';

const schema = z
  .object({
    email: z.string().email('Email invalide'),
    password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['passwordConfirm'],
  });

type FormData = z.infer<typeof schema>;

export function SignUpForm() {
  const { execute, isPending, error } = useServerAction(register);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => execute(data);

  return (
    <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
      {error && <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error.message}</div>}
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="nom@exemple.com" {...form.register('email')} />
        {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input id="password" type="password" {...form.register('password')} />
        {form.formState.errors.password && <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="passwordConfirm">Confirmer le mot de passe</Label>
        <Input id="passwordConfirm" type="password" {...form.register('passwordConfirm')} />
        {form.formState.errors.passwordConfirm && (
          <p className="text-sm text-destructive">{form.formState.errors.passwordConfirm.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Création du compte...' : 'Créer un compte'}
      </Button>
    </form>
  );
}
