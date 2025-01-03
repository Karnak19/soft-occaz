'use client';

import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useDescription, useTsController } from '@ts-react/form';
import { FileUploader } from 'react-drag-drop-files';

import { Button } from '$/components/ui/button';
import { toast } from '$/components/ui/use-toast';
import { PicturePreviewer } from '$/components/Form/core/PicturePreviewer';

const fileTypes = ['JPEG', 'PNG', 'GIF', 'JPG', 'HEIC', 'HEIF'];

function ImageField() {
  const [photos, setPhotos] = useState<File[]>([]);

  const { label } = useDescription();
  const { field, error } = useTsController<any[]>();

  const MAX_FILES = 3;

  useEffect(() => {
    field.onChange(photos);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos]);

  return (
    <div className="col-span-full grid place-items-center gap-1">
      <label>{label}</label>

      <div className="flex gap-3">
        <FileUploader
          handleChange={(file: FileList) => {
            if (file.length > MAX_FILES) {
              toast({
                variant: 'destructive',
                description: `Vous ne pouvez pas uploader plus de ${MAX_FILES} images`,
              });
              return;
            }

            const newFiles = Array.from(file);

            // if new file is existing in photos, don't add it
            if (newFiles.some((f) => photos.some((p) => p.name === f.name))) {
              toast({
                variant: 'destructive',
                description: 'Vous ne pouvez pas uploader deux fois la même image',
              });
              return;
            }

            setPhotos([...photos, ...newFiles]);
          }}
          classes="!w-full !h-36 !border-muted-foreground"
          maxSize={5}
          maxLength={MAX_FILES}
          multiple={true}
          name="file"
          types={fileTypes}
        />

        {!!photos?.length && (
          <div className="grid place-items-center">
            <Button variant="secondary" size="sm" onClick={() => field.onChange([])}>
              <XMarkIcon className="mr-1 size-4" />
              Reset
            </Button>
          </div>
        )}
      </div>
      <PicturePreviewer images={field.value as File[]} onChange={setPhotos} />

      {error?.errorMessage && <span className="text-red-500">{error?.errorMessage}</span>}
    </div>
  );
}

export default ImageField;
