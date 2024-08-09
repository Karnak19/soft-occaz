export function imgKitUrl(url: string | undefined) {
  const isImgKit = url?.startsWith('https://ik.imagekit.io');

  return isImgKit ? `${url}?tr=w-800,q-100` : url ?? '/placeholder.webp';
}

export function imgKitUrlThumbnail(url: string | undefined) {
  const isImgKit = url?.startsWith('https://ik.imagekit.io');

  return isImgKit ? `${url}?tr=w-420,q-95` : url ?? '/placeholder.webp';
}

export function imgKitUrlLow(url: string | undefined) {
  const isImgKit = url?.startsWith('https://ik.imagekit.io');

  return isImgKit ? `${url}?tr=w-80,q-20` : url ?? '/placeholder.webp';
}
