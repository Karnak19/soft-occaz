'use client';

import { ShareIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

import { Button } from '$/components/ui/button';
import { Dialog, DialogContent } from '$/components/ui/dialog';
import ShareModal from './ShareModal';

interface ShareButtonProps {
  title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setShowShareModal(true)}>
        <ShareIcon className="size-5" />
      </Button>

      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent>
          <ShareModal title={title} onClose={() => setShowShareModal(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
