'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HeartIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ClientResponseError } from 'pocketbase';

import { usePocketbase, useUser } from '$/app/pocketbase-provider';

export function FavoriteButton({ id }: { id: string }) {
  const { pb } = usePocketbase();
  const user = useUser();

  const { data: isFavorite, refetch } = useQuery({
    queryKey: ['favorites', id],
    queryFn: async () => {
      try {
        return await pb.collection('favorites').getFirstListItem(`listing = "${id}"`);
      } catch (error) {
        if (error instanceof ClientResponseError && error.status === 404) {
          return null;
        }
        throw error;
      }
    },
  });

  const create = useMutation({
    mutationFn: () =>
      pb.collection('favorites').create({
        listing: id,
        user: user?.id,
      }),
    onSuccess: () => refetch(),
  });

  const remove = useMutation({
    mutationFn: () => {
      if (!isFavorite?.id) {
        throw new Error('No favorite found to remove');
      }
      return pb.collection('favorites').delete(isFavorite.id);
    },
    onSuccess: () => refetch(),
  });

  const toggleFavorite = () => {
    if (isFavorite) {
      remove.mutate();
    } else {
      create.mutate();
    }
  };

  return (
    <motion.button
      onClick={toggleFavorite}
      className="rounded-full p-2 hover:bg-muted"
      title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait">
        {isFavorite ? (
          <motion.div key="filled" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <HeartIcon className="size-6 text-red-500 fill-red-500" />
          </motion.div>
        ) : (
          <motion.div key="outline" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <HeartIcon className="size-6 text-muted-foreground" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
