export function imgKitUrl(url: string) {
  const isImgKit = url.startsWith('https://ik.imagekit.io');

  return isImgKit ? `${url}?tr=w-800,q-100` : url;
}
