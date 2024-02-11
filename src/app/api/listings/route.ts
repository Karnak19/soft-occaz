import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { prisma } from '$/utils/db';
import { getClerkUserFromDb } from '$/utils/getClerkUserFromDb';
import { listingCreationCheck } from '$/utils/listingCreationCheck';

import { uploader } from './fileUploader';
import { createListingSchema } from './schema';

export const revalidate = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const author = searchParams.get('author');
  const limit = searchParams.get('limit');

  const listings = await prisma.listing.findMany({
    where: {
      ...(author
        ? {
            OR: [{ user: { clerkId: { contains: author } } }, { userId: { contains: author } }],
          }
        : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: limit ? parseInt(limit) : undefined,
  });

  return NextResponse.json(listings, {
    headers: {
      'cache-control': 'public, max-age=300',
      'content-type': 'application/json',
    },
  });
}

export async function POST(req: Request) {
  const _user = await getClerkUserFromDb();

  try {
    await listingCreationCheck(_user);
  } catch (error) {
    return NextResponse.json({ created: false, error: (error as Error).message }, { status: 403 });
  }

  const isPayingUser = ['hobby', 'premium', 'geardo'].includes(_user.sub?.toLowerCase() ?? '');

  const isPremium = ['premium'].includes(_user.sub?.toLowerCase() ?? '');

  const body = await req.formData();

  // remove extra images based on subscription:
  // free: 3
  // hobby & geardo: 5
  // premium: 7
  const images = body.getAll('images').slice(0, !isPayingUser ? 3 : !isPremium ? 5 : 7);

  const imagesUrl = await Promise.all(images.map((image) => uploader(image as File, _user.id)));

  const data = {
    userId: _user.id,
    price: Number(body.get('price')),
    title: body.get('title'),
    description: body.get('description'),
    images: imagesUrl,
    type: body.get('type'),
    sold: false,
  };

  const created = await prisma.listing.create({
    data: createListingSchema.parse(data),
  });

  revalidatePath('/dashboard/*');

  return NextResponse.json({
    created: true,
    listing: created,
  });
}
