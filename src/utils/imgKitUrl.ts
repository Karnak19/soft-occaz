export function imgKitUrl(url: string) {
  const isImgKit = url.startsWith('https://ik.imagekit.io');

  return isImgKit ? `${url}?tr=w-800,q-100` : url;
}

export function imgKitUrlThumbnail(url: string) {
  const isImgKit = url.startsWith('https://ik.imagekit.io');

  return isImgKit ? `${url}?tr=w-420,q-95` : url;
}

export function imgKitUrlLow(url: string) {
  const isImgKit = url.startsWith('https://ik.imagekit.io');

  return isImgKit ? `${url}?tr=w-80,q-20` : url;
}
