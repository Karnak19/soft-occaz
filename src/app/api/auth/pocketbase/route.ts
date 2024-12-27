import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs';

import { pb } from '$/utils/pocketbase/client';
import { Collections } from '$/utils/pocketbase/pocketbase-types';

export async function POST() {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get user data from Clerk
    const user = await currentUser();
    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // transform imageUrl to an image
    const image = await fetch(user.imageUrl).then((res) => res.blob());

    // Create user in PocketBase with clerkId as both username and password
    await pb.collection(Collections.Users).create({
      clerkId: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      name: user.username,
      password: user.id, // Use clerkId as password
      passwordConfirm: user.id, // Required by PocketBase
      avatar: image,
    });

    return new NextResponse('User created', { status: 201 });
  } catch (error) {
    console.error('Failed to create PocketBase user:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
