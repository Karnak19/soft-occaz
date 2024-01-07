'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type Listing, Type } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'react-hot-toast';

import { useMe } from '$/hooks/useMe';
import { cn } from '$/utils/cn';

import Button from '../Button';
import Spinner from '../Spinner';
import AirsoftOccasionScrapper from './AirsoftOccasionScrapper';
import { MyForm, zFileList, zImagesPreviewer, zRichText, zSelect } from './core/mapping';

function ListingForm(props: { edit?: Listing }) {
  const router = useRouter();
  const qc = useQueryClient();
  const { data } = useMe();

  const listingSchema = useMemo(
    () =>
      z.object({
        title: z.string().min(3).max(50).describe("Titre de l'annonce"),
        price: z.number().min(1).max(1000000).describe('Prix (en €)'),
        type: zSelect.describe('Type'),
        ...(props.edit && { sold: z.boolean().optional().describe('Vendu') }),
        description: zRichText.describe('Description'),
        ...(props.edit ? { images: zImagesPreviewer.describe('Photos') } : { images: zFileList.describe('Photos') }),
      }),
    [props.edit],
  );

  const form = useForm<z.infer<typeof listingSchema>>({
    resolver: zodResolver(listingSchema),
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
      const parsed = listingSchema.omit({ type: true }).parse({
        title: data.title,
        price: Number(data.price.slice(0, -2).replace(',', '.')),
        description: data.description,
        images: data.images,
      });

      Object.entries(parsed).forEach(([key, value]) => {
        form.setValue(key as never, value as never);
      });

      toast.success('Annonce importée avec succès !');
    },
  });

  const isEdit = !!props.edit;

  const createListing = useMutation({
    mutationFn: async (data: z.infer<typeof listingSchema>) => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'images') {
          (value as File[]).forEach((file) => {
            formData.append('images', file);
          });
        } else {
          formData.append(key, value as string);
        }
      });

      return fetch(isEdit ? `/api/listings/${props.edit?.id}` : '/api/listings', {
        method: isEdit ? 'PUT' : 'POST',
        // headers: { 'content-type': 'multipart/form-data' },
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.created || res.updated) {
            return res;
          }

          throw new Error(res.error);
        });
    },
    onSuccess: () => {
      qc.invalidateQueries();

      router.push('/dashboard/annonces');
      form.reset();

      createListing.reset();

      toast.success(isEdit ? 'Annonce modifiée avec succès !' : 'Annonce créée avec succès !');
    },
    onError: (err) => toast.error((err as Error).message),
  });

  const onSubmit = (_data: z.infer<typeof listingSchema>) => {
    createListing.mutate(_data);
  };

  const initialValues = useMemo(() => {
    if (isEdit) {
      return props.edit;
    }

    return undefined;
  }, [props.edit, scrapAirsoftOccasion.data]);

  const isFormError = Object.values(form.formState.errors).some((e) => e.message);

  return (
    <>
      {!isEdit && (
        <AirsoftOccasionScrapper
          mutate={scrapAirsoftOccasion.mutate}
          isSuccess={scrapAirsoftOccasion.isSuccess}
          isLoading={scrapAirsoftOccasion.isPending}
          hasAccess={data?.sub?.toLowerCase() !== 'free'}
        />
      )}
      <MyForm
        formProps={{
          className: cn('mx-auto grid grid-cols-1 gap-5 rounded bg-white p-8 shadow lg:grid-cols-3 w-full', {
            'bg-red-50 ring-red-400 ring-1': isFormError,
          }),
        }}
        props={{ type: { options: Object.values(Type) } }}
        schema={listingSchema}
        form={form}
        defaultValues={initialValues}
        onSubmit={onSubmit}
        renderAfter={() => (
          <div className="col-start-1 col-span-full">
            <Button
              disabled={scrapAirsoftOccasion.isPending || createListing.isPending || createListing.isSuccess || isFormError}
              type="submit"
            >
              {createListing.isPending ? (
                <>
                  <span>En cours...</span>
                  <Spinner className="ml-2 text-white" />
                </>
              ) : isEdit ? (
                'Modifier'
              ) : (
                'Créer'
              )}
            </Button>
          </div>
        )}
      />
    </>
  );
}

export default ListingForm;
