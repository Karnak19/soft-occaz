'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ClientResponseError } from 'pocketbase';
import { z } from 'zod';
import { createServerAction, ZSAError } from 'zsa';

import { Collections } from '$/utils/pocketbase/pocketbase-types';
import { createServerClient } from '$/utils/pocketbase/server';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const login = createServerAction()
  .onSuccess(() => redirect('/'))
  .input(loginSchema)
  .handler(async ({ input }) => {
    const pb = await createServerClient();

    try {
      await pb.collection(Collections.Users).authWithPassword(input.email, input.password);
    } catch (e) {
      const err = e as ClientResponseError;
      throw new ZSAError('INPUT_PARSE_ERROR', err.message);
    }
  });

const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['passwordConfirm'],
  });

export const register = createServerAction()
  .onSuccess(() => redirect('/'))
  .input(registerSchema)
  .handler(async ({ input }) => {
    const pb = await createServerClient();

    try {
      await pb.collection(Collections.Users).create({
        email: input.email,
        password: input.password,
        passwordConfirm: input.passwordConfirm,
        emailVisibility: true,
      });

      await pb.collection(Collections.Users).authWithPassword(input.email, input.password);
    } catch (e) {
      const err = e as ClientResponseError;
      throw new ZSAError('INPUT_PARSE_ERROR', err.message);
    }
  });

export const logout = createServerAction()
  .onSuccess(() => redirect('/'))
  .handler(async () => {
    const client = await createServerClient();
    await client.authStore.clear();

    revalidatePath('/', 'layout');
  });
