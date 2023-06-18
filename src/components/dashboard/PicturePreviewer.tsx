export function PicturePreviewer(props: { images?: string[] }) {
  return (
    <div className="col-span-full lg:col-span-1">
      <div className="flex flex-wrap gap-2">
        {props.images?.map((image, index) => (
          <img key={`secondaryImage${index}`} src={image} alt={`secondaryImage${index}`} className="object-cover h-32 rounded" />
        ))}
      </div>
    </div>
  );
}
