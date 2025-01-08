'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ClientResponseError } from 'pocketbase';
import { z } from 'zod';
import { ZSAError, createServerAction } from 'zsa';

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
    referral_code: z.string().length(6).optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['passwordConfirm'],
  });

async function verifyAndSetReferrer(pb: any, userId: string, referralCode: string) {
  try {
    const referrerRecord = await pb.collection(Collections.Users).getFirstListItem(`referral_code = "${referralCode}"`);
    await pb.collection(Collections.Users).update(userId, {
      referrer: referrerRecord.id,
    });
  } catch (e) {
    console.error('Failed to verify referral code:', e);
  }
}

export const register = createServerAction()
  .onSuccess(() => redirect('/'))
  .input(registerSchema)
  .handler(async ({ input }) => {
    const pb = await createServerClient();

    try {
      // If there's a referral code, verify it exists
      let referrer: string | undefined;
      if (input.referral_code) {
        const referrerRecord = await pb
          .collection(Collections.Users)
          .getFirstListItem(`referral_code = "${input.referral_code}"`);
        referrer = referrerRecord.id;
      }

      await pb.collection(Collections.Users).create({
        email: input.email,
        password: input.password,
        passwordConfirm: input.passwordConfirm,
        emailVisibility: true,
        referrer,
      });

      await pb.collection(Collections.Users).authWithPassword(input.email, input.password);
    } catch (e) {
      const err = e as ClientResponseError;
      if (err.response?.code === 404) {
        throw new ZSAError('INPUT_PARSE_ERROR', 'Code de parrainage invalide');
      }
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

// Create a server action to handle OAuth referral code verification
export const verifyOAuthReferralCode = createServerAction()
  .input(z.object({ userId: z.string(), referralCode: z.string() }))
  .handler(async ({ input }) => {
    const pb = await createServerClient();
    await verifyAndSetReferrer(pb, input.userId, input.referralCode);
  });
