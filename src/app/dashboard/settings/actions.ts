'use server';

import { z } from 'zod';

import { authedProcedure } from '$/utils/zsa';

const SettingsSchema = z.object({
  name: z.string().min(2, 'Le nom doit faire au moins 2 caractères'),
  email: z.string().email('Veuillez entrer une adresse email valide'),
  avatar: z.any(),
  departement: z.number().min(1).max(999),
  payment: z.string(),
  shipping: z.string(),
});

export const updateSettings = authedProcedure
  .createServerAction()
  .input(SettingsSchema)
  .handler(async ({ ctx, input }) => {
    const { name, email, avatar, departement, payment, shipping } = input;
    const { user, pb } = ctx;

    const avatarFile = z.instanceof(File).safeParse(avatar?.[0]);

    const userData = await pb.collection('users').update(user.id, {
      name,
      email,
      departement,
      payment,
      shipping,
      avatar: avatarFile.success ? avatarFile.data : undefined,
    });

    return userData;
  });

function generateReferralCode() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export const generateReferralCodeAction = authedProcedure
  .createServerAction()
  .input(z.object({}))
  .handler(async ({ ctx }) => {
    const { user, pb } = ctx;

    const code = generateReferralCode();
    const userData = await pb.collection('users').update(user.id, {
      referral_code: code,
    });

    return userData;
  });
