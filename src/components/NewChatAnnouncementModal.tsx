import { useState } from 'react';

import { Button } from '$/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$/components/ui/dialog';

export function NewChatAnnouncementModal() {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <Button onClick={() => setOpen(false)} className="w-full">
            Compris !
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
