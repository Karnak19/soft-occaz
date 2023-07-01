'use client';

import { type Listing, Type } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { z } from 'zod';

import Button from '../Button';
import { MyForm, zFile, zRichText, zSelect } from './core/mapping';

function ListingCreation(props: { edit?: Listing }) {
  const router = useRouter();
  const qc = useQueryClient();

  const isEdit = !!props.edit;

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
      }),
    [props.edit],
  );

  const onSubmit = async (data: z.infer<typeof listingSchema>) => {
    const res = await fetch(!isEdit ? '/api/listings' : `/api/listings/${props.edit?.id}`, {
      method: isEdit ? 'PUT' : 'POST',
      body: JSON.stringify(data),
    }).then((res) => res.json());

    qc.invalidateQueries();

    router.push(res.redirect);
  };

  const initialValues = props.edit && {
    ...props.edit,
    mainImage: props.edit?.images[0],
    imageTwo: props.edit?.images[1],
    imageThree: props.edit?.images[2],
  };

  return (
    <MyForm
      formProps={{
        className: 'mx-auto grid grid-cols-1 gap-5 rounded bg-white p-8 shadow lg:grid-cols-3',
      }}
      props={{ type: { options: Object.values(Type) } }}
      schema={listingSchema}
      defaultValues={initialValues}
      onSubmit={onSubmit}
      renderAfter={() => (
        <div className="col-start-1 col-span-full">
          <Button type="submit">Submit</Button>
        </div>
      )}
    />
  );
}

export default ListingCreation;
