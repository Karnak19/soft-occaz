'use client';

import { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useDescription, useTsController } from '@ts-react/form';
import { XMarkIcon } from '@heroicons/react/24/solid';

import { PicturePreviewer } from '$/components/dashboard/PicturePreviewer';
import Button from '$/components/Button';
import { useMe } from '$/hooks/useMe';
import { useToast } from '$/components/ui/use-toast';

const fileTypes = ['JPEG', 'PNG', 'GIF', 'JPG', 'HEIC', 'HEIF'];

function ImageField() {
  const [photos, setPhotos] = useState<File[]>([]);

  const { label } = useDescription();
  const { field, error } = useTsController<any[]>();

  const { toast } = useToast();

  const { data } = useMe();

  const isPayingUser = ['hobby', 'premium', 'geardo'].includes(data?.sub?.toLowerCase() ?? '');
  const isPremium = ['premium'].includes(data?.sub?.toLowerCase() ?? '');

  const maxFiles = isPremium ? 7 : isPayingUser ? 5 : 3;

  useEffect(() => {
    field.onChange(photos);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos]);

  return (
    <div className="gap-1 grid place-items-center col-span-full">
      <label>{label}</label>

      <div className="flex gap-3">
        <FileUploader
          handleChange={(file: FileList) => {
            if (file.length > maxFiles) {
              toast({
                variant: 'destructive',
                description: `Vous ne pouvez pas uploader plus de ${maxFiles} images`,
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
          maxLength={maxFiles}
          multiple={true}
          name="file"
          types={fileTypes}
        />

        {!!photos?.length && (
          <div className="grid place-items-center">
            <Button variant="secondary" size="sm" onClick={() => field.onChange([])}>
              <XMarkIcon className="h-4 w-4 mr-1" />
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
