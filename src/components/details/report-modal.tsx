'use client';

import { FlagIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { usePocketbase, useUser } from '$/app/pocketbase-provider';
import { Button } from '$/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$/components/ui/dialog';
import { useToast } from '$/components/ui/use-toast';

interface ReportModalProps {
  listingId: string;
}

const REPORT_REASONS = [
  { id: 'inappropriate', label: 'Contenu inapproprié' },
  { id: 'scam', label: 'Arnaque potentielle' },
  { id: 'counterfeit', label: 'Produit contrefait' },
  { id: 'other', label: 'Autre raison' },
] as const;

type ReportReason = (typeof REPORT_REASONS)[number]['id'];

export default function ReportModal({ listingId }: ReportModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const me = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { pb } = usePocketbase();

  const reportMutation = useMutation({
    mutationFn: (reason: ReportReason) => {
      return pb.collection('reports').create({
        listing: listingId,
        reason,
        reporter: me?.id,
      });
    },
    onSuccess: () => {
      toast({
        title: 'Merci pour votre signalement',
        description: 'Nous allons examiner votre signalement dans les plus brefs délais.',
      });
      // Invalidate the report count query to update the warning banner
      queryClient.invalidateQueries({ queryKey: ['reports', listingId, 'count'] });
      setIsOpen(false);
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
    <>
      <Button variant="destructive" className="w-full" onClick={() => setIsOpen(true)}>
        <FlagIcon className="mr-2 size-5" />
        Signaler cette annonce
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Signaler l&apos;annonce</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 pt-4">
            {REPORT_REASONS.map(({ id, label }) => (
              <Button
                key={id}
                onClick={() => handleReport(id)}
                disabled={reportMutation.isPending}
                variant="destructive"
                className="w-full"
              >
                {label}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
