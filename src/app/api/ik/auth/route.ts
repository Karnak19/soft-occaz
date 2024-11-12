import { NextResponse } from 'next/server';
import { env } from '$/env';
import Imagekit from 'imagekit';

export const GET = async () => {
  const imagekit = new Imagekit({
    publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: 'https://ik.imagekit.io/e40qgenad/',
  });

  const expiration = new Date(Date.now() + 30 * 1000); 

  const params = imagekit.getAuthenticationParameters(
    undefined,
    Math.floor(expiration.getTime() / 1000),
  );

  return NextResponse.json(params);
};
