'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { HeartIcon } from 'lucide-react';

import { usePocketbase, useUser } from '$/app/pocketbase-provider';

const noop = async () => true;

export function FavoriteButton(id: string) {
  const { pb } = usePocketbase();
  const user = useUser();

  const { data: isFavorite } = useQuery({
    queryKey: ['favorites', id],
    queryFn: () => pb.collection('favorites').getFirstListItem(`listing = "${id}"`),
  });

  const create = useMutation({
    mutationFn: () =>
      pb.collection('favorites').create({
        listing: id,
        user: user?.id,
      }),
  });

  const remove = useMutation({
    mutationFn: () => (isFavorite?.id ? pb.collection('favorites').delete(isFavorite?.id) : noop()),
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
            <HeartIcon className="size-6 text-red-500" />
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
