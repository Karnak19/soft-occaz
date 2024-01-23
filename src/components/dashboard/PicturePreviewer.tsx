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
        {Array.from(props.images ?? []).map((image, index) => {
          return (
            <div className="relative" key={typeof image === 'string' ? image : image.name}>
              {typeof image === 'string' ? (
                <img src={image} alt={image} className="h-32 rounded object-cover" />
              ) : (
                <>
                  {isValidWebImage(image) ? (
                    <img src={URL.createObjectURL(image)} alt={image.name} className="h-32 rounded object-cover" />
                  ) : isHeic(image) || isHeif(image) ? (
                    <div className="grid size-32 place-items-center rounded border border-red-500 p-1">
                      <p className="text-center text-orange-500">
                        <>Preview impossible, mais l&apos;image sera bien uploadée</>
                      </p>
                    </div>
                  ) : null}
                </>
              )}
              <Button
                size="sm"
                variant="secondary"
                className="absolute -right-3 -top-2 z-10 size-6 rounded-full bg-white p-0"
                onClick={() => {
                  const images = Array.from(props.images ?? []);

                  props.onChange(images.filter((_, i) => i !== index));
                }}
              >
                <XMarkIcon className="size-4" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
