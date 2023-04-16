export function PicturePreviewer(props: { mainImage: FileList; secondaryImages: FileList }) {
  return (
    <div className="col-span-full">
      <h2>Preview</h2>
      <div className="flex flex-wrap gap-2">
        {props.mainImage?.[0] && (
          <img src={URL.createObjectURL(props.mainImage[0])} alt="mainImage" className="h-32 rounded object-cover" />
        )}
        {!!props.secondaryImages?.length &&
          Array.from(props.secondaryImages)
            .slice(0, 2)
            .map((image, index) => (
              <img
                key={`secondaryImage${index}`}
                src={URL.createObjectURL(image)}
                alt={`secondaryImage${index}`}
                className="h-32 rounded object-cover"
              />
            ))}
      </div>
    </div>
  );
}
