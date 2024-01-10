function ListItemImages({ images, title }: { images: string[]; title: string }) {
  return (
    <div className="flex -space-x-1 p-0.5 overflow-hidden">
      {images?.map((img, i) => (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img
          key={img + i}
          className="inline-block h-10 w-10 rounded-full ring-2 ring-muted"
          src={img}
          alt={`${title} picture ${i}`}
        />
      ))}
    </div>
  );
}

export default ListItemImages;
