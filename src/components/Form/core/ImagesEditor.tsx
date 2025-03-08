'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import { useDescription, useTsController } from '@ts-react/form';
import { FileUploader } from 'react-drag-drop-files';

import { Button } from '$/components/ui/button';
import { toast } from '$/components/ui/use-toast';

export function ImageEditor() {
  const { field } = useTsController<(string | File)[]>();
  const { label } = useDescription();

  const MAX_FILES = 3;

  return (
    <div className="col-span-full grid place-items-center gap-2">
      <label>{label}</label>

      <div className="flex flex-wrap gap-4">
        {/* preview images with delete button */}
        {field.value?.map((img, i) => {
          const url = typeof img === 'string' ? img : URL.createObjectURL(img);

          return (
            <div key={i} className="relative">
              <img src={url} alt="preview" className="h-32 object-cover" />
              <Button
                size="sm"
                variant="secondary"
                type="button"
                className="absolute -right-3 -top-2 z-10 size-6 rounded-full bg-white p-0"
                onClick={() => field.onChange(field.value?.filter((_, j) => i !== j))}
              >
                <XMarkIcon className="size-4" />
              </Button>
            </div>
          );
        })}
      </div>
      <div>
        <FileUploader
          handleChange={(files: FileList) => {
            const len = (field.value?.length ?? 0) + files.length;

            if (len > MAX_FILES) {
              toast({
                variant: 'destructive',
                description: `Vous ne pouvez pas avoir plus de ${MAX_FILES} images`,
              });
              return;
            }

            const newFiles = Array.from(files);

            field.onChange([...(field.value ?? []), ...newFiles]);
          }}
          maxSize={5}
          maxLength={MAX_FILES}
          multiple={true}
          name="file"
          types={['JPEG', 'PNG', 'GIF', 'JPG', 'HEIC', 'HEIF']}
          classes="w-full! h-36! border-muted-foreground!"
        />
      </div>
      <div>
        <p className="text-xs italic text-muted-foreground">
          N&apos;oubliez pas votre limite d&apos;images, si vous voulez en ajouter plus, pensez à supprimer les anciennes.
        </p>
      </div>
    </div>
  );
}
