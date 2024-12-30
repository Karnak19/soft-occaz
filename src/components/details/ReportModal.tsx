'use client';

import { XCircleIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { useUser } from '$/app/pocketbase-provider';

import { Card } from '../ui/card';
import { useToast } from '../ui/use-toast';

const MotionCard = motion(Card);

interface ReportModalProps {
  listingId: string;
  onClose: () => void;
}

const REPORT_REASONS = [
  { id: 'inappropriate', label: 'Contenu inapproprié' },
  { id: 'scam', label: 'Arnaque potentielle' },
  { id: 'counterfeit', label: 'Produit contrefait' },
  { id: 'other', label: 'Autre raison' },
] as const;

type ReportReason = (typeof REPORT_REASONS)[number]['id'];

export default function ReportModal({ listingId, onClose }: ReportModalProps) {
  const me = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const reportMutation = useMutation({
    mutationFn: async (reason: ReportReason) => {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ listingId, reason }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit report');
      }

      return res.json();
    },
    onSuccess: () => {
      toast({
        title: 'Merci pour votre signalement',
        description: 'Nous allons examiner votre signalement dans les plus brefs délais.',
      });
      // Invalidate the report count query to update the warning banner
      queryClient.invalidateQueries({ queryKey: ['reports', listingId, 'count'] });
      onClose();
    },
    onError: () => {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors du signalement.',
        variant: 'destructive',
      });
    },
  });

  const handleReport = async (reason: ReportReason) => {
    if (!me?.id) {
      toast({
        title: 'Erreur',
        description: 'Vous devez être connecté pour signaler une annonce.',
        variant: 'destructive',
      });
      return;
    }

    reportMutation.mutate(reason);
  };

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
          {REPORT_REASONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleReport(id)}
              disabled={reportMutation.isPending}
              className="w-full rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {label}
            </button>
          ))}
          <button onClick={onClose} className="w-full rounded-md border border-muted px-4 py-2 hover:bg-muted">
            Annuler
          </button>
        </div>
      </MotionCard>
    </motion.div>
  );
}
