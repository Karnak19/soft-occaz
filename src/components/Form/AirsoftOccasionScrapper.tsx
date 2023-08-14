import { CheckIcon } from '@heroicons/react/20/solid';
import { UseMutateFunction } from '@tanstack/react-query';
import Link from 'next/link';
import { z } from 'zod';

import { cn } from '$/utils/cn';

import Button from '../Button';
import Spinner from '../Spinner';
import { MyForm } from './core/mapping';

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
    <MyForm
      onSubmit={onSubmit}
      schema={schema}
      formProps={{
        className: cn(
          'relative mx-auto w-full grid grid-cols-3 gap-5 rounded bg-gradient-to-r ring-amber-400 ring-1 from-amber-100 p-8 shadow',
          {
            'from-green-100 to-green-100 ring-green-400': isSuccess,
          },
        ),
      }}
      renderBefore={() => <div className="col-span-full">Importer une annonce depuis Airsoft-occasion</div>}
      renderAfter={() => (
        <div className="flex flex-col-reverse">
          {!hasAccess && (
            <div className="absolute inset-0 bg-gradient-to-r from-amber-300/50 grid place-items-center to-amber-100/50 backdrop-blur">
              <Link href="/dashboard/plans" className="underline">
                Upgradez votre compte pour importer des annonces depuis Airsoft-occasion
              </Link>
            </div>
          )}
          <Button
            variant="premium"
            size="sm"
            className={cn('py-2', isSuccess && 'from-green-600 to-green-100 border-green-700')}
            type="submit"
          >
            {isSuccess ? (
              <>
                <span>Annonce importée</span>
                <CheckIcon className="ml-2 h-5 w-5" />
              </>
            ) : isLoading ? (
              <>
                <span>Importation en cours...</span>
                <Spinner className="ml-2 h-5 w-5 text-white" />
              </>
            ) : (
              <span>Importer</span>
            )}
          </Button>
        </div>
      )}
    >
      {({ url }) => <div className="col-span-2">{url}</div>}
    </MyForm>
  );
}

export default AirsoftOccasionScrapper;
