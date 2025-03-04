export function imgKitUrl(url: string | undefined) {
  if (!isImgKitUrl(url)) return url ?? '/placeholder.webp';
  return `${url}?tr=w-800,q-100`;
}

export function imgKitUrlThumbnail(url: string | undefined) {
  if (!isImgKitUrl(url)) return url ?? '/placeholder.webp';
  return `${url}?tr=w-420,q-95`;
}

export function imgKitUrlLow(url: string | undefined) {
  if (!isImgKitUrl(url)) return url ?? '/placeholder.webp';
  return `${url}?tr=w-80,q-20`;
}

export const isImgKitUrl = (url: string | undefined) => {
  return url?.startsWith('https://ik.imagekit.io');
};
