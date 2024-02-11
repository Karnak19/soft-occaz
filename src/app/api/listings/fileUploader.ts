import { env } from '$/env';
import Imagekit from 'imagekit';
import { z } from 'zod';

const imagekit = new Imagekit({
  publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  privateKey: env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: 'https://ik.imagekit.io/your_imagekit_id/',
});

const urlSchema = z.string().url().startsWith('https://www.airsoft-occasion.fr');

export async function uploader(file: File | string, folder?: string) {
  if (typeof file === 'string') {
    if (urlSchema.parse(file)) {
      return file;
    }

    throw new Error('Invalid URL');
  }

  const blobUrl = URL.createObjectURL(file);

  const response = await fetch(blobUrl);
  const buffer = await response.arrayBuffer();

  const uploaded = await imagekit.upload({
    folder: folder,
    file: Buffer.from(buffer),
    fileName: file.name,
  });

  URL.revokeObjectURL(blobUrl);

  return uploaded.url;
}
