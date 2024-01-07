'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from '$/components/Button';
import { useMe } from '$/hooks/useMe';
import { MyForm, zRange, zTextarea } from '$/components/Form/core/mapping';
import { z } from 'zod';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Spinner from '$/components/Spinner';
const schema = z.object({
  rating: zRange.describe('Note de la transaction'),
  text: zTextarea.describe('Commentaire // Laisser un avis...'),
});

export default function RatingSlideOver({ ownerId }: { ownerId: string }) {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const params = useParams();

  const { data: me } = useMe();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof schema>) => {
      const res = await fetch(`/api/listings/${params.id}/rating`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Something went wrong');
      }

      setOpen(false);

      router.refresh();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['listings'],
      });
    },
  });

  const handleSubmit = async (data: z.infer<typeof schema>) => mutation.mutateAsync(data);

  if (me?.id === ownerId) {
    return null;
  }

  return (
    <>
      <div>
        <Button onClick={() => setOpen(true)}>Laisser un avis</Button>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-300"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">Ajouter un avis</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-rg-500 focus:ring-offset-2"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <MyForm
                          schema={schema}
                          onSubmit={handleSubmit}
                          renderAfter={() => (
                            <div className="flex justify-end pt-2">
                              <Button type="submit">
                                {mutation.isPending ? (
                                  <>
                                    <Spinner className="mr-2" />
                                    En cours...
                                  </>
                                ) : (
                                  'Envoyer'
                                )}
                              </Button>
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
