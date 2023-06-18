import { useDescription, useTsController } from '@ts-react/form';

import { PicturePreviewer } from '$/components/dashboard/PicturePreviewer';
import { UploadButton } from '$/components/UploadButton';

function ImageField() {
  const { label } = useDescription();
  const { field, error } = useTsController<string>();

  return (
    <div className="gap-1 grid place-items-center">
      <label>{label}</label>
      {!field.value ? <UploadButton onChange={field.onChange} /> : <PicturePreviewer images={field.value ? [field.value] : []} />}
      {error?.errorMessage && <span className="text-red-500">{error?.errorMessage}</span>}
    </div>
  );
}

export default ImageField;
