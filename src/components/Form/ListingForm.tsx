'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createListingAction } from '$/app/dashboard/annonces/new/actions';
import { useServerActionMutation } from '$/hooks/zsa';
import { cn } from '$/utils/cn';
import { ListingsFeesOptions, ListingsResponse, ListingsTypeOptions } from '$/utils/pocketbase/pocketbase-types';

import { toast } from 'sonner';
import Spinner from '../Spinner';
import AirsoftOccasionScrapper from './AirsoftOccasionScrapper';
import { MyFormWithTemplate } from './core/mapping';
import {
  zFileList,
  zImagesEditor,
  zImagesPreviewer,
  zOptionalCheckboxGroup,
  zSelect,
  zTipTapRichText,
} from './core/unique-fields';

function ListingForm(props: { edit?: ListingsResponse<string[]> }) {
  const [isImported, setIsImported] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const { mutate, isPending, isSuccess } = useServerActionMutation(createListingAction, {
    onSuccess: () => {
      toast.success('Annonce créée avec succès !');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const listingSchema = useMemo(
    () =>
      z.object({
        title: z.string().min(3).max(50).describe("Titre de l'annonce"),
        price: z.number().min(1).max(1000000).describe('Prix (en €)'),
        type: zSelect.describe('Type'),
        fees: zOptionalCheckboxGroup.describe('Frais inclus'),
        description: zTipTapRichText.describe('Description'),
        ...(props.edit || isImported ? { images: zImagesEditor.describe('Photos') } : { images: zFileList.describe('Photos') }),
      }),
    [props.edit, isImported],
  );

  const form = useForm<z.infer<typeof listingSchema>>({
    resolver: zodResolver(listingSchema),
  });

  const scrappedListingSchema = listingSchema.omit({ type: true, images: true, title: true, fees: true }).extend({
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
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      const parsed = scrappedListingSchema.parse({
        title: data.title,
        price: data.price,
        description: data.description,
        images: data.images,
      });

      Object.entries(parsed).forEach(([key, value]) => {
        form.setValue(key as never, value as never);
      });

      setIsImported(true);

      toast.success('Annonce importée avec succès !');
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
    const payload = _data as z.infer<typeof listingSchema> & { id?: string };

    if (isEdit) {
      payload.id = params.id as string;
    }

    setIsLoading(true);
    // Upload all images concurrently
    const uploadedImageUrls = await Promise.all(
      _data.images.map(async (image: File | string) => {
        if (image instanceof File) {
          const imageFormData = new FormData();
          imageFormData.append('file', image);
          imageFormData.append('listingId', isEdit ? (params.id as string) : 'temp');

          const response = await fetch('/api/images', {
            method: 'POST',
            body: imageFormData,
          });

          if (!response.ok) {
            form.setError('images', { message: 'Failed to upload image' });
            setIsLoading(false);
            throw new Error('Failed to upload image');
          }

          const { url } = await response.json();
          return url;
        }
        return image;
      }),
    );

    payload.images = uploadedImageUrls;

    mutate(payload);
  };

  const isFormError = Object.values(form.formState.errors).some((e) => e.message);

  // Prepare fee options with human-readable labels
  const feeOptions = [
    { value: ListingsFeesOptions.paypal_in, label: 'Frais PayPal inclus' },
    { value: ListingsFeesOptions.shipping_in, label: 'Frais de port inclus' },
  ];

  return (
    <>
      {!isEdit && (
        <AirsoftOccasionScrapper
          mutate={scrapAirsoftOccasion.mutate}
          isSuccess={scrapAirsoftOccasion.isSuccess}
          isLoading={scrapAirsoftOccasion.isPending}
          hasAccess
        />
      )}
      <MyFormWithTemplate
        formProps={{
          className: cn({ 'ring-destructive ring-2': isFormError }),
          submitButtonProps: {
            disabled: scrapAirsoftOccasion.isPending || isPending || isSuccess,
            children: (
              <>
                {isLoading || isPending ? (
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
        props={{
          title: { wrapperClassName: 'col-span-full' },
          type: { options: Object.values(ListingsTypeOptions) },
          fees: { options: feeOptions },
        }}
        schema={listingSchema}
        form={form}
        defaultValues={initialValues}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default ListingForm;
