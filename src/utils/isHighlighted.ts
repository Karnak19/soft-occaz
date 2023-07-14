export function isHighlighted(val?: string | null) {
  return ['geardo', 'premium'].includes(val?.toLowerCase() ?? '');
}
