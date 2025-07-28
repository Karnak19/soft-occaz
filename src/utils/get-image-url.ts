import { getResizeItUrl, isResizeItUrl } from './get-resizeit-url';

export const getImageUrl = (url: string | undefined, width = 800, height = 800, quality = 100) => {
  if (!url) return '/placeholder.webp';

  if (isResizeItUrl(url)) {
    return getResizeItUrl({ url, width, height, quality });
  }

  return url;
};
