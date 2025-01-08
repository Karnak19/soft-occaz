import { env } from '$/env';
import Imagekit from 'imagekit';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const imagekit = new Imagekit({
    publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: 'https://ik.imagekit.io/e40qgenad/',
  });

  const params = imagekit.getAuthenticationParameters();

  return NextResponse.json(params);
};
