import { CheckIcon } from '@heroicons/react/20/solid';
import { UseMutateFunction } from '@tanstack/react-query';
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
}: {
  mutate: UseMutateFunction<any, unknown, string, unknown>;
  isLoading: boolean;
  isSuccess: boolean;
}) {
  const onSubmit = (data: z.infer<typeof schema>) => mutate(data.url);

  return (
    <MyForm
      onSubmit={onSubmit}
      schema={schema}
      formProps={{
        className: cn('relative mx-auto w-full grid grid-cols-2 gap-5 rounded bg-white p-8 shadow', {
          'bg-green-100': isSuccess,
        }),
      }}
      renderBefore={() => <div className="col-span-full">Importer une annonce depuis Airsoft-occasion</div>}
      renderAfter={() => (
        <div className="col-span-full">
          <Button className={cn(isSuccess && 'bg-green-600 hover:bg-green-700 text-white')} block type="submit">
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
      {({ url }) => <div className="col-span-full">{url}</div>}
    </MyForm>
  );
}

export default AirsoftOccasionScrapper;
