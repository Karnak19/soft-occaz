import { AnnoncesTypeOptions } from './pocketbase-types';

export function searchFilterGenerator(searchTerm: string | null) {
  const type = findType(searchTerm || '');
  const typeFilter = type ? `|| type = "${type}"` : '';

  const searchWithoutType = (type && searchTerm?.replace(type, '')) || searchTerm || '';

  const titles = searchWithoutType
    .split(' ')
    .map((word) => `title ~ "${word.trim()}"`)
    .join(' || ');

  const descs = searchWithoutType
    .split(' ')
    .map((word) => `description ~ "${word.trim()}"`)
    .join(' || ');

  return `${titles} || ${descs} ${typeFilter}`;
}

function findType(query: string) {
  const types = Object.values(AnnoncesTypeOptions);

  for (const type of types) {
    if (query.includes(type)) {
      return type;
    }
  }
}
