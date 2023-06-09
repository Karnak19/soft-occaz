import { prisma } from '$/utils/db';

import { Root } from './Types';

const webhookSecret = process.env.WEBHOOK_SECRET || 'thisissecret';

export const runtime = process.env.VERCEL_ENV === 'production' ? 'edge' : 'nodejs';

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
  }

  return new Response(null, { status: 204 });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
