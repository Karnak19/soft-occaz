'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type Listing, Type } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useMe } from '$/hooks/useMe';
import { cn } from '$/utils/cn';

import Button from '../Button';
import Spinner from '../Spinner';
import AirsoftOccasionScrapper from './AirsoftOccasionScrapper';
import { MyForm, zFile, zRichText, zSelect } from './core/mapping';

const hobbyGeardoExtraImages = {
  imageFour: zFile.optional().describe('Photo 4'),
  imageFive: zFile.optional().describe('Photo 5'),
};

const premiumExtraImages = {
  imageSix: zFile.optional().describe('Photo 6'),
  imageSeven: zFile.optional().describe('Photo 7'),
};

function ListingCreation(props: { edit?: Listing }) {
  const router = useRouter();
  const qc = useQueryClient();
  const { data } = useMe();

  const listingSchema = useMemo(
    () =>
      z.object({
        title: z.string().min(1).max(50).describe("Titre de l'annonce"),
        price: z.number().min(1).max(1000000).describe('Prix (en €)'),
        type: zSelect.describe('Type'),
        ...(props.edit && { sold: z.boolean().optional().describe('Vendu') }),
        description: zRichText.describe('Description'),
        mainImage: zFile.describe('Photos principale'),
        imageTwo: zFile.optional().describe('Photo 2'),
        imageThree: zFile.optional().describe('Photo 3'),
        ...(data?.sub?.toLowerCase() === 'hobby' && hobbyGeardoExtraImages),
        ...(data?.sub?.toLowerCase() === 'geardo' && hobbyGeardoExtraImages),
        ...(data?.sub?.toLowerCase() === 'premium' && {
          ...hobbyGeardoExtraImages,
          ...premiumExtraImages,
        }),
      }),
    [props.edit, data],
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
        mainImage: data.images[0],
        imageTwo: data.images[1],
        imageThree: data.images[2],
        imageFour: data.images[3],
        imageFive: data.images[4],
        imageSix: data.images[5],
        imageSeven: data.images[6],
      });

      Object.entries(parsed).forEach(([key, value]) => {
        form.setValue(key as never, value as never);
      });
    },
  });

  const isEdit = !!props.edit;

  const createListing = useMutation({
    mutationFn: async (data: z.infer<typeof listingSchema>) => {
      return fetch(isEdit ? `/api/listings/${props.edit?.id}` : '/api/listings', {
        method: isEdit ? 'PUT' : 'POST',
        body: JSON.stringify(data),
      }).then((res) => res.json());
    },
    onSuccess: (data) => {
      qc.invalidateQueries();

      router.push(data.redirect);
      form.reset();
    },
  });

  const onSubmit = async (_data: z.infer<typeof listingSchema>) => {
    await createListing.mutateAsync(_data);
  };

  const initialValues = useMemo(() => {
    if (isEdit) {
      return {
        ...props.edit,
        mainImage: props.edit?.images[0],
        imageTwo: props.edit?.images[1],
        imageThree: props.edit?.images[2],
        imageFour: props.edit?.images[3],
        imageFive: props.edit?.images[4],
        imageSix: props.edit?.images[5],
        imageSeven: props.edit?.images[6],
      };
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
          isLoading={scrapAirsoftOccasion.isLoading}
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
              disabled={scrapAirsoftOccasion.isLoading || createListing.isLoading || createListing.isSuccess || isFormError}
              type="submit"
            >
              {createListing.isLoading ? (
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

export default ListingCreation;
