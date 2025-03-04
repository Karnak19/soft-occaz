import { env } from '$/env';
import { ResizeIt } from '@karnak19/resize-it-sdk';
import { NextResponse } from 'next/server';

import { auth } from '$/utils/pocketbase/server';

const resizeIt = new ResizeIt({
  baseUrl: 'https://resize-it.airsoftmarket.fr',
  apiKey: env.RESIZE_IT_API_KEY,
});

export async function POST(req: Request) {
  const { isValid, user } = await auth();

  if (!isValid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const fileExtension = file.name.split('.').pop();

  const resizedImage = await resizeIt.uploadImage(buffer, {
    path: `${user.id}/${new Date().getTime()}-${fileExtension}`,
    contentType: file.type,
  });

  return NextResponse.json({ url: resizedImage.url });
}
