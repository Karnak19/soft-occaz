const BASE_URL = 'https://resize-it-api.airsoftmarket.fr';

import { ResizeIt } from '@karnak19/resize-it-sdk';

const resizeIt = new ResizeIt({
  baseUrl: 'https://resize-it-api.airsoftmarket.fr',
});

export const getResizeItUrl = ({
  quality,
  width,
  height,
  url,
}: {
  quality?: number;
  width?: number;
  height?: number;
  url?: string;
}) => {
  const params = new URLSearchParams();
  if (quality) params.set('quality', quality.toString());
  if (width) params.set('width', width.toString());
  if (height) params.set('height', height.toString());

  if (!url) return '';

  return resizeIt.getResizeUrl(url, {
    width,
    height,
    quality,
    watermark: { text: 'Airsoft Market' },
  });
};

export const isResizeItUrl = (url: string) => {
  return url.startsWith(BASE_URL);
};
