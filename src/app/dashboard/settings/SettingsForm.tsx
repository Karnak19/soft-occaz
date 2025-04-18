'use client';

import { z } from 'zod';

import { MyFormWithTemplate } from '$/components/Form/core/mapping';
import { zOptionalImageDropzone, zSelect } from '$/components/Form/core/unique-fields';
import { useToast } from '$/components/ui/use-toast';
import { useServerActionMutation } from '$/hooks/zsa';
import { getPaymentMethodLabel } from '$/utils/getPaymentMethodLabel';
import { getShippingMethodLabel } from '$/utils/getShippingMethodLabel';
import { UsersPaymentOptions, UsersResponse, UsersShippingOptions } from '$/utils/pocketbase/pocketbase-types';

import { updateSettings } from './actions';

const SettingsSchema = z.object({
  name: z.string().min(2, 'Le nom doit faire au moins 2 caractères').describe('Nom // Votre nom'),
  email: z.string().email('Veuillez entrer une adresse email valide').describe('Email // votre@email.com'),
  avatar: zOptionalImageDropzone.describe('Photo de profil'),
  departement: z.number().min(1).max(999).describe('Département // Votre département'),
  // payment: z.nativeEnum(UsersPaymentOptions).describe('Méthode de paiement // PayPal, Cash, Bank Transfer, Lydia'),
  // shipping: z.nativeEnum(UsersShippingOptions).describe('Méthode de livraison // En main propre, Colissimo, Mondial Relay'),
  payment: zSelect.describe('Méthode de paiement préférée // Choisissez une méthode de paiement...'),
  shipping: zSelect.describe('Méthode de livraison préférée // Choisissez une méthode de livraison...'),
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
        departement: user.departement || undefined,
        payment: user.payment || undefined,
        shipping: user.shipping || undefined,
      }}
      props={{
        avatar: { maxFiles: 1 },
        payment: { options: Object.values(UsersPaymentOptions).map((e) => ({ label: getPaymentMethodLabel(e), value: e })) },
        shipping: { options: Object.values(UsersShippingOptions).map((e) => ({ label: getShippingMethodLabel(e), value: e })) },
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
