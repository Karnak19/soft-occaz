import { pb } from "$/utils/pocketbase";
import { AdsResponse } from "$/utils/pocketbase-types";
import Link from "next/link";
import Badge from "./Badge";
import { SendBadge } from "./SendBadge";
import sanitizer from "$/utils/sanitizer";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";

function ProductCard(product: AdsResponse & { href: string }) {
  const imageSrc = product.field?.[0]
    ? pb.getFileUrl(product, product.field?.[0])
    : "https://picsum.photos/300";

  const createdRelative = formatDistance(
    new Date(product.created),
    new Date(),
    { addSuffix: true, locale: fr }
  );

  return (
    <div
      key={product.id}
      className="group grid grid-cols-6 gap-4 relative border border-zinc-600 p-4 sm:p-2 rounded-2xl"
    >
      <div className="aspect-video col-span-2 overflow-hidden rounded-l-lg bg-zinc-600 group-hover:opacity-75">
        <img
          src={imageSrc}
          alt={product.title}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col gap-2 col-span-3">
        <h3 className="text-xl font-medium text-zinc-200  ">
          <Link href={product.href}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.title}
          </Link>
        </h3>
        <p className="text-sm line-clamp-3 flex-1">
          {sanitizer(product.description).substring(0, 200)}
        </p>
        <p className="text-sm text-zinc-400">Publié {createdRelative}</p>
        <p className="font-medium text-lg text-zinc-50">{product.price} EUR</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <SendBadge send={product.envoi} />
        <Badge variant={product.type} />
      </div>
    </div>
  );
}

export default ProductCard;
