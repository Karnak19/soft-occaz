'use server';

import { z } from 'zod';

import { authedProcedure } from '$/utils/zsa';
import { zFileList } from '$/components/Form/core/unique-fields';

const SettingsSchema = z.object({
  name: z.string().min(2, 'Le nom doit faire au moins 2 caractères'),
  email: z.string().email('Veuillez entrer une adresse email valide'),
  avatar: zFileList.optional(),
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
      avatar: avatar[0]?.id,
    });

    return userData;
  });
