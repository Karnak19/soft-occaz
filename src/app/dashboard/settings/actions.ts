'use server';

import { z } from 'zod';

import { zFileList } from '$/components/Form/core/unique-fields';
import { authedProcedure } from '$/utils/zsa';

const SettingsSchema = z.object({
  name: z.string().min(2, 'Le nom doit faire au moins 2 caractères'),
  email: z.string().email('Veuillez entrer une adresse email valide'),
  avatar: z.union([zFileList, z.undefined()]),
});

export const updateSettings = authedProcedure
  .createServerAction()
  .input(SettingsSchema)
  .handler(async ({ ctx, input }) => {
    const { name, email, avatar } = input;
    const { user, pb } = ctx;

    const userData = await pb.collection('users').update(user.id, {
      name,
      email,
      avatar: avatar?.[0]?.id,
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
