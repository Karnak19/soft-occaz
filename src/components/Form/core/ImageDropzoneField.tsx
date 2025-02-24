'use client';

import { useDescription, useTsController } from '@ts-react/form';

import ImageDropzone from '$/components/image-dropzone';

function ImageDropzoneField({ maxFiles = 3 }: { maxFiles?: number }) {
  const { field, error } = useTsController<File[]>();
  const { label } = useDescription();

  return (
    <div className="flex flex-col gap-1">
      {label && <label>{label}</label>}
      <ImageDropzone
        maxFiles={maxFiles}
        onChange={(files) => {
          field.onChange(files);
        }}
      />
      {error?.errorMessage && <span className="text-red-500">{error?.errorMessage}</span>}
    </div>
  );
}

export default ImageDropzoneField;
