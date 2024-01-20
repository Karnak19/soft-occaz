import { UseMutateFunction } from '@tanstack/react-query';
import Link from 'next/link';
import { z } from 'zod';

import { cn } from '$/utils/cn';

import { MyFormWithTemplate } from './core/mapping';

const schema = z.object({
  url: z.string().url().startsWith('https://www.airsoft-occasion.fr').describe('URL'),
});

function AirsoftOccasionScrapper({
  mutate,
  isLoading,
  isSuccess,
  hasAccess,
}: {
  mutate: UseMutateFunction<any, unknown, string, unknown>;
  isLoading: boolean;
  isSuccess: boolean;
  hasAccess: boolean;
}) {
  const onSubmit = (data: z.infer<typeof schema>) => mutate(data.url);

  return (
    <>
      <MyFormWithTemplate
        formProps={{
          className: cn('relative overflow-hidden from-amber-100 dark:from-amber-100/30 bg-gradient-to-b ring-1 ring-amber-400', {
            'from-green-100 ring-green-400': isSuccess,
          }),
          renderBefore: () => <>Importer une annonce depuis Airsoft-occasion</>,
          submitButtonProps: {
            variant: 'premium',
            children: <>{isSuccess ? 'Annonce importée' : isLoading ? 'Importation en cours...' : 'Importer'} </>,
          },
          isLoading,
        }}
        props={{
          url: {
            className: 'bg-muted',
          },
        }}
        onSubmit={onSubmit}
        schema={schema}
        renderAfter={() => (
          <>
            {!hasAccess && (
              <div className="absolute inset-0 bg-gradient-to-r from-amber-300/50 grid place-items-center to-amber-100/50 backdrop-blur">
                <Link href="/dashboard/plans" className="underline">
                  Upgradez votre compte pour importer des annonces depuis Airsoft-occasion
                </Link>
              </div>
            )}
          </>
        )}
      />
    </>
  );
}

export default AirsoftOccasionScrapper;
