import { pb } from "$/utils/pocketbase";
import { AdsResponse } from "$/utils/pocketbase-types";
import Link from "next/link";
import Badge from "./Badge";
import { SendBadge } from "./SendBadge";

function ProductCard(product: AdsResponse & { href: string }) {
  const imageSrc = product.field?.[0]
    ? pb.getFileUrl(product, product.field?.[0])
    : "https://picsum.photos/300";

  return (
    <div
      key={product.id}
      className="group relative border border-zinc-600 p-4 sm:p-6"
    >
      <div className="aspect-square overflow-hidden rounded-lg bg-zinc-600 group-hover:opacity-75">
        <img
          src={imageSrc}
          alt={product.title}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="pt-10 pb-4 flex flex-col gap-2 items-center">
        <h3 className="text-sm font-medium">
          <Link href={product.href}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.title}
          </Link>
        </h3>
        <div className="flex items-center gap-2">
          <SendBadge send={product.envoi} />
          <Badge variant={product.type} />
        </div>
        <p className="text-base font-medium">{product.price} EUR</p>
      </div>
    </div>
  );
}

export default ProductCard;
