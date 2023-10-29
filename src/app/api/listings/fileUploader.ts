import { env } from '$/env';

import Imagekit from 'imagekit';

const imagekit = new Imagekit({
  publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  privateKey: env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: 'https://ik.imagekit.io/your_imagekit_id/',
});

export async function uploader(file: File, folder?: string) {
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
