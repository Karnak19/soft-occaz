import { useDescription, useTsController } from '@ts-react/form';

function ImagePreviewField({}: {}) {
  const { field } = useTsController<string[]>();

  const { label } = useDescription();

  return (
    <div className="col-span-full grid place-items-center gap-1">
      <label>{label}</label>
      <div className="flex flex-wrap gap-4 pt-3">
        {Array.from(field.value ?? []).map((image) => (
          <div className="relative" key={image}>
            <img src={image} alt={image} className="h-52 rounded object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImagePreviewField;
