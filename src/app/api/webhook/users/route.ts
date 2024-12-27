import { env } from '$/env';

import { prisma } from '$/utils/db';
import { Collections } from '$/utils/pocketbase/pocketbase-types';
import { pb } from '$/utils/pocketbase/server';

import { type Root } from './Types';

const webhookSecret = env.WEBHOOK_SECRET || 'thisissecret';

async function handler(request: Request) {
  const secret = new URL(request.url).searchParams.get('secret');

  const payload = (await request.json()) as Root;

  if (secret !== webhookSecret) {
    return new Response('Unauthorized', { status: 401 });
  }

  const eventType = payload.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const user = {
      clerkId: payload.data.id,
      firstName: payload.data.first_name || '',
      lastName: payload.data.last_name || '',
      email: payload.data.email_addresses.find((e) => e.id === payload.data.primary_email_address_id)?.email_address,
      username: payload.data.username,
      avatar: payload.data.profile_image_url,
    };

    await prisma.user.upsert({
      where: { clerkId: payload.data.id },
      create: user,
      update: user,
    });

    // profile image url is a string, so we need to download it and save it to pocketbase
    const image = await fetch(payload.data.profile_image_url).then((res) => res.blob());

    const pb_user = await pb.collection(Collections.Users).getFirstListItem(`clerkId="${payload.data.id}"`);

    if (!pb_user) {
      await pb.collection(Collections.Users).create({
        clerkId: payload.data.id,
        firstName: payload.data.first_name || '',
        lastName: payload.data.last_name || '',
        email: payload.data.email_addresses.find((e) => e.id === payload.data.primary_email_address_id)?.email_address,
        username: payload.data.username,
        name: payload.data.username,
        avatar: image,
        password: payload.data.id,
        passwordConfirm: payload.data.id,
      });
    } else {
      const user = await pb.collection(Collections.Users).getFirstListItem(`clerkId="${payload.data.id}"`);
      await pb.collection(Collections.Users).update(user.id, {
        firstName: payload.data.first_name || '',
        lastName: payload.data.last_name || '',
        email: payload.data.email_addresses.find((e) => e.id === payload.data.primary_email_address_id)?.email_address,
        username: payload.data.username,
        name: payload.data.username,
        avatar: image,
      });
    }
  }

  return new Response(null, { status: 204 });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
