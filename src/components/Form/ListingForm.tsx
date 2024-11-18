'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Type, type Listing } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';

import { cn } from '$/utils/cn';
import { useMe } from '$/hooks/useMe';
import { createListingAction } from '$/app/dashboard/annonces/new/actions';

import Spinner from '../Spinner';
import { useToast } from '../ui/use-toast';
import AirsoftOccasionScrapper from './AirsoftOccasionScrapper';
import { MyFormWithTemplate } from './core/mapping';
import { zFileList, zImagesEditor, zImagesPreviewer, zRichText, zSelect } from './core/unique-fields';

function ListingForm(props: { edit?: Listing }) {
  const [isImported, setIsImported] = useState(false);
  const { toast } = useToast();
  const params = useParams();
  const { data: user } = useMe();
  const { execute, isPending, isSuccess, error } = useServerAction(createListingAction);

  const listingSchema = useMemo(
    () =>
      z.object({
        title: z.string().min(3).max(50).describe("Titre de l'annonce"),
        price: z.number().min(1).max(1000000).describe('Prix (en €)'),
        type: zSelect.describe('Type'),
        description: zRichText.describe('Description'),
        ...(props.edit || isImported ? { images: zImagesEditor.describe('Photos') } : { images: zFileList.describe('Photos') }),
      }),
    [props.edit, isImported],
  );

  const form = useForm<z.infer<typeof listingSchema>>({
    resolver: zodResolver(listingSchema),
  });

  const scrappedListingSchema = listingSchema.omit({ type: true, images: true, title: true }).extend({
    images: zImagesPreviewer.optional().describe('Photos'),
    title: z.string().describe("Titre de l'annonce"),
    price: z.number().min(1).max(1000000).nullable().describe('Prix (en €)'),
  });

  const scrapAirsoftOccasion = useMutation({
    mutationFn: async (url: string) => {
      const res = await fetch('/api/scrapper/airsoft-occasion', {
        method: 'POST',
        body: JSON.stringify({ url }),
      }).then((res) => res.json() as Promise<{ title: string; price: string; description: string; images: string[] }>);

      return res;
    },
    onSuccess: (data) => {
      const parsed = scrappedListingSchema.parse({
        title: data.title,
        price: Number(data.price.slice(0, -2).replace(',', '.')) || null,
        description: data.description,
        images: data.images,
      });

      Object.entries(parsed).forEach(([key, value]) => {
        form.setValue(key as never, value as never);
      });

      setIsImported(true);

      toast({ description: 'Annonce importée avec succès !', variant: 'success' });
    },
  });

  const isEdit = !!props.edit;
  const initialValues = useMemo(() => {
    if (isEdit) {
      return props.edit;
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.edit, scrapAirsoftOccasion.data]);

  const onSubmit = async (_data: z.infer<typeof listingSchema>) => {
    const formData = new FormData();

    if (isEdit) {
      formData.append('id', params.id as string);
    }

    Object.entries(_data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((file) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, value);
      }
    });

    await execute(formData);
    toast({ description: `Annonce ${isEdit ? 'modifiée' : 'créée'} avec succès !`, variant: 'success' });
  };

  const isFormError = Object.values(form.formState.errors).some((e) => e.message);

  return (
    <>
      {!isEdit && (
        <AirsoftOccasionScrapper
          mutate={scrapAirsoftOccasion.mutate}
          isSuccess={scrapAirsoftOccasion.isSuccess}
          isLoading={scrapAirsoftOccasion.isPending}
          hasAccess={user?.sub?.toLowerCase() !== 'free'}
        />
      )}
      <MyFormWithTemplate
        formProps={{
          className: cn({ 'ring-destructive ring-2': isFormError }),
          submitButtonProps: {
            disabled: scrapAirsoftOccasion.isPending || isPending || isSuccess,
            children: (
              <>
                {isPending ? (
                  <>
                    <span>En cours...</span>
                    <Spinner className="ml-2 text-white" />
                  </>
                ) : isEdit ? (
                  'Modifier'
                ) : (
                  'Créer'
                )}
              </>
            ),
          },
        }}
        props={{ type: { options: Object.values(Type) } }}
        schema={listingSchema}
        form={form}
        defaultValues={initialValues}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default ListingForm;
