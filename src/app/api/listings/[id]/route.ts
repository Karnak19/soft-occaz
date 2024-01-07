import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { prisma } from '$/utils/db';
import { listingSchema } from '../schema';

export const revalidate = 60;

export const PUT = async (request: Request, { params }: { params: { id: string } }) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const body = await request.formData();

  const updated = await prisma.listing.update({
    where: { id: params.id },
    data: listingSchema.parse({
      price: Number(body.get('price')),
      title: body.get('title'),
      description: body.get('description'),
      images: body.getAll('images'),
      type: body.get('type'),
      sold: body.get('sold') === 'true',
    }),
  });

  revalidatePath(`/annonces/details/${updated.id}`);
  revalidatePath(`/dashboard/annonces/${updated.id}`);

  return NextResponse.json({ updated: true, redirect: `/annonces/details/${updated.id}` }, { status: 200 });
};

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const listing = await prisma.listing.findUniqueOrThrow({
    where: { id: params.id },
    include: {
      user: true,
      rating: {
        include: { from: true },
      },
    },
  });

  return NextResponse.json(listing);
};
