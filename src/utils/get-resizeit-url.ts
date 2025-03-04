const BASE_URL = 'https://resize-it-api.airsoftmarket.fr';

export const getResizeItUrl = ({
  quality,
  width,
  height,
}: {
  quality?: number;
  width?: number;
  height?: number;
}) => {
  const params = new URLSearchParams();
  if (quality) params.set('quality', quality.toString());
  if (width) params.set('width', width.toString());
  if (height) params.set('height', height.toString());

  return `${BASE_URL}/resize?${params.toString()}`;
};

export const isResizeItUrl = (url: string) => {
  return url.startsWith(BASE_URL);
};
