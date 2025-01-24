'use client';

import { useEffect, useState } from 'react';

import { updateChatAnnouncementSeen } from '$/app/dashboard/chats/actions';
import { useUserPreferences } from '$/app/pocketbase-provider';
import { Button } from '$/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$/components/ui/dialog';
import { useServerActionMutation } from '$/hooks/zsa';

export function NewChatAnnouncementModal() {
  const [open, setOpen] = useState(false);
  const { mutate: markAsSeen } = useServerActionMutation(updateChatAnnouncementSeen);
  const { data: preferences } = useUserPreferences();

  useEffect(() => {
    console.log('🚀 ~ useEffect ~ preferences:', preferences, open);
    if (!preferences) return;

    if (!preferences?.has_seen_chat_announcement) {
      setOpen(true);
    }
  }, [preferences]);

  const handleClose = () => {
    setOpen(false);
    markAsSeen({});
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nouvelle version du chat ! 🎉</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            La version précédente n&apos;étant pas suffisamment stable et ne permettait pas de gérer les conversations de manière
            efficace, nous avons décidé de la remplacer par une nouvelle version.
          </p>
          <p className="text-sm text-muted-foreground">
            Cette nouvelle version doit résoudre les problèmes de stabilité et de performance de la version précédente.
          </p>
          <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
            <li>Interface plus moderne et intuitive</li>
            <li>Notifications dans la sidebar</li>
            <li>Support des emojis</li>
          </ul>
          <Button onClick={handleClose} className="w-full">
            Compris !
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
