export function PicturePreviewer(props: { mainImage: FileList; secondaryImages: FileList }) {
  return (
    <div className="col-span-full">
      <h2>Preview</h2>
      <div className="flex flex-wrap gap-2">
        {props.mainImage?.[0] && (
          <img src={URL.createObjectURL(props.mainImage[0])} alt="mainImage" className="object-cover h-32 rounded" />
        )}
        {!!props.secondaryImages?.length &&
          Array.from(props.secondaryImages)
            .slice(0, 2)
            .map((image, index) => (
              <img
                key={`secondaryImage${index}`}
                src={URL.createObjectURL(image)}
                alt={`secondaryImage${index}`}
                className="object-cover h-32 rounded"
              />
            ))}
      </div>
    </div>
  );
}
