const BASE_URL = 'https://resize-it.airsoftmarket.fr';

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

  return url + `?${params.toString()}`;
};

export const isResizeItUrl = (url: string) => {
  return url.startsWith(BASE_URL);
};
