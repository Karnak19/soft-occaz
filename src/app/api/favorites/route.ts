import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import { prisma } from '$/utils/db';

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { listingId } = await request.json();

  if (!listingId) {
    return NextResponse.json({ error: 'Missing listingId' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { favorites: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const existingFavorite = user.favorites.find((fav) => fav.id === listingId);

  if (existingFavorite) {
    // Remove from favorites
    await prisma.user.update({
      where: { id: user.id },
      data: {
        favorites: {
          disconnect: { id: listingId },
        },
      },
    });
    return NextResponse.json({ isFavorite: false });
  } else {
    // Add to favorites
    await prisma.user.update({
      where: { id: user.id },
      data: {
        favorites: {
          connect: { id: listingId },
        },
      },
    });
    return NextResponse.json({ isFavorite: true });
  }
}

export async function GET(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const listingId = searchParams.get('listingId');

  if (!listingId) {
    return NextResponse.json({ error: 'Missing listingId' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { favorites: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const isFavorite = user.favorites.some((fav) => fav.id === listingId);

  return NextResponse.json({ isFavorite });
}
