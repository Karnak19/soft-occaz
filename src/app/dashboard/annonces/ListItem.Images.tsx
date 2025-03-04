import { getImageUrl } from '$/utils/get-image-url';

function ListItemImages({ images, title }: { images: string[]; title: string }) {
  return (
    <div className="flex -space-x-1 overflow-hidden p-0.5">
      {images?.map((img, i) => {
        const url = getImageUrl(img, 40, 40, 80);
        return (
          <img
            key={img + i}
            className="inline-block size-10 rounded-full ring-2 ring-muted"
            src={url}
            alt={`${title} picture ${i}`}
          />
        );
      })}
    </div>
  );
}

export default ListItemImages;
