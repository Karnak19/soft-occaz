import { XMarkIcon } from '@heroicons/react/24/solid';
import Button from '../Button';

// eslint-disable-next-line unused-imports/no-unused-vars
export function PicturePreviewer(props: { images: File[]; onChange: (value: File[]) => void }) {
  const isValidWebImage = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

    return validTypes.includes(file.type);
  };

  const isHeic = (file: File) => file.type === 'image/heic';
  const isHeif = (file: File) => file.type === 'image/heif';

  return (
    <div className="col-span-full lg:col-span-1">
      <div className="flex flex-wrap gap-4 pt-3">
        {Array.from(props.images ?? []).map((image, index) => (
          <div className="relative" key={image.name}>
            {isValidWebImage(image) ? (
              <img src={URL.createObjectURL(image)} alt={image.name} className="object-cover h-32 rounded" />
            ) : isHeic(image) || isHeif(image) ? (
              <div className="h-32 w-32 p-1 grid place-items-center rounded border-red-500 border">
                <p className="text-orange-500 text-center">
                  <>Preview impossible, mais l&apos;image sera bien uploadée</>
                </p>
              </div>
            ) : null}
            <Button
              size="sm"
              variant="secondary"
              className="absolute -top-2 -right-3 w-6 h-6 p-0 bg-white rounded-full z-10"
              onClick={() => {
                const images = Array.from(props.images ?? []);

                props.onChange(images.filter((_, i) => i !== index));
              }}
            >
              <XMarkIcon className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
