import { Button } from '$/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '$/components/ui/dialog';
import { Input } from '$/components/ui/input';
import type { Editor } from '@tiptap/react';
import { YoutubeIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { ToolbarButton } from '../toolbar-button';

interface YoutubeAddDialogProps {
  editor: Editor;
}

const YoutubeAddDialog = ({ editor }: YoutubeAddDialogProps) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ToolbarButton isActive={editor.isActive('youtube')} tooltip="YouTube" aria-label="YouTube">
          <YoutubeIcon className="size-5" />
        </ToolbarButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add YouTube video</DialogTitle>
          <DialogDescription className="sr-only">Add a YouTube video from a URL</DialogDescription>
        </DialogHeader>
        <div>
          <Input type="text" placeholder="Enter YouTube video URL" ref={inputRef} />
          <Button
            type="button"
            onClick={() => {
              if (inputRef.current) {
                editor.commands.setYoutubeVideo({ src: inputRef.current.value, width: 480, height: 270 });
                setOpen(false);
              }
            }}
          >
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { YoutubeAddDialog };
