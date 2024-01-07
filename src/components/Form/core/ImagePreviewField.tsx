import React from 'react';
import { useDescription, useTsController } from '@ts-react/form';

function ImagePreviewField({}: {}) {
  const { field } = useTsController<string[]>();

  const { label } = useDescription();

  return (
    <div className="gap-1 grid place-items-center col-span-full">
      <label>{label}</label>
      <div className="flex flex-wrap gap-4 pt-3">
        {Array.from(field.value ?? []).map((image) => (
          <div className="relative" key={image}>
            <img src={image} alt={image} className="object-cover h-52 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImagePreviewField;
