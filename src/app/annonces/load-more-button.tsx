'use client';

import { parseAsInteger, useQueryState } from 'nuqs';

import { Button } from '$/components/ui/button';

export function LoadMoreButton({ currentPage }: { currentPage: number }) {
  const [, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({
      history: 'replace',
      shallow: false,
    }),
  );

  return (
    <Button variant="outline" onClick={() => setPage(currentPage + 1)}>
      Voir plus d'annonces
    </Button>
  );
}
