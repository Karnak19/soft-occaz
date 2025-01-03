'use client';

import { z } from 'zod';

import { UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { useServerActionMutation } from '$/hooks/zsa';
import { useToast } from '$/components/ui/use-toast';
import { MyFormWithTemplate } from '$/components/Form/core/mapping';
import { zFileList } from '$/components/Form/core/unique-fields';

import { updateSettings } from './actions';

const SettingsSchema = z.object({
  name: z.string().min(2, 'Le nom doit faire au moins 2 caractères').describe('Nom // Votre nom'),
  email: z.string().email('Veuillez entrer une adresse email valide').describe('Email // votre@email.com'),
  avatar: zFileList.optional().describe('Photo de profil'),
});

interface SettingsFormProps {
  user: UsersResponse;
}

export function SettingsForm({ user }: SettingsFormProps) {
  const { toast } = useToast();
  const { mutate, isPending } = useServerActionMutation(updateSettings, {
    onSuccess: () => {
      toast({
        title: 'Paramètres mis à jour',
        description: 'Vos paramètres ont été mis à jour avec succès.',
      });
    },
    onError: () => {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la mise à jour de vos paramètres.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = async (data: z.infer<typeof SettingsSchema>) => {
    mutate(data);
  };

  return (
    <MyFormWithTemplate
      schema={SettingsSchema}
      onSubmit={onSubmit}
      defaultValues={{
        name: user.name || '',
        email: user.email,
      }}
      formProps={{
        submitButtonProps: {
          children: isPending ? 'Enregistrement...' : 'Enregistrer',
          disabled: isPending,
        },
      }}
    />
  );
}
