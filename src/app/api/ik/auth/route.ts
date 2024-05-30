import { NextResponse } from 'next/server';
import { env } from '$/env';
import Imagekit from 'imagekit';

export const GET = async () => {
  const imagekit = new Imagekit({
    publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: 'https://ik.imagekit.io/your_imagekit_id/',
  });

  const params = imagekit.getAuthenticationParameters();

  return NextResponse.json(params);
};
