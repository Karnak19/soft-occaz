import { NextResponse } from 'next/server';
import { env } from '$/env';
import Imagekit from 'imagekit';

import { getClerkUserFromDb } from '$/utils/getClerkUserFromDb';

const imagekit = new Imagekit({
  publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  privateKey: env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: 'https://ik.imagekit.io/e40qgenad/',
});

export async function POST(req: Request) {
  const user = await getClerkUserFromDb();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File;
  const listingId = formData.get('listingId') as string;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadResponse = await imagekit.upload({
    file: buffer,
    fileName: `${listingId}-${file.name}`,
    folder: user.id,
    tags: ['listing'],
  });

  return NextResponse.json({ url: uploadResponse.url });
}
