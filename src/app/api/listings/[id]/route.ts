import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { prisma } from '$/utils/db';

export const revalidate = 60;

export const PUT = async (request: Request, { params }: { params: { id: string } }) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const body = await request.json();

  const updated = await prisma.listing.update({
    where: { id: params.id },
    data: {
      price: body.price,
      title: body.title,
      description: body.description,
      images: [body.mainImage, ...(body.imageTwo ? [body.imageTwo] : []), ...(body.imageThree ? [body.imageThree] : [])],
      type: body.type,
      delivery: body.delivery,
    },
  });

  revalidatePath(`/annonces/details/${updated.id}`);
  revalidatePath(`/dashboard/annonces/${updated.id}`);

  return NextResponse.json({ updated: true, redirect: `/annonces/details/${updated.id}` }, { status: 200 });
};

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const listing = await prisma.listing.findUniqueOrThrow({ where: { id: params.id } });

  return NextResponse.json(listing);
};
