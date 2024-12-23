import { XCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

import { Card } from '../ui/card';

const MotionCard = motion(Card);

interface ReportModalProps {
  onClose: () => void;
}

export default function ReportModal({ onClose }: ReportModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[51] grid place-items-center bg-black/60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MotionCard
        className="w-full max-w-md overflow-auto p-6"
        initial={{ y: 100, opacity: 0, scale: 0.1 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0 }}
      >
        <div>
          <button type="button" className="p-4 md:p-0" onClick={onClose}>
            <span className="sr-only">Close</span>
            <XCircleIcon className="size-8 text-muted-foreground hover:text-foreground" aria-hidden="true" />
          </button>
        </div>

        <h3 className="mb-4 text-lg font-medium">Signaler l&apos;annonce</h3>
        <div className="flex flex-col gap-4">
          <button onClick={onClose} className="w-full rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600">
            Contenu inapproprié
          </button>
          <button onClick={onClose} className="w-full rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600">
            Arnaque potentielle
          </button>
          <button onClick={onClose} className="w-full rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600">
            Produit contrefait
          </button>
          <button onClick={onClose} className="w-full rounded-md border border-muted px-4 py-2 hover:bg-muted">
            Annuler
          </button>
        </div>
      </MotionCard>
    </motion.div>
  );
}
