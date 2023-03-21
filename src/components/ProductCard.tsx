import { cn } from "$/utils/cn";
import { AdsTypeOptions } from "$/utils/pocketbase-types";
import Link from "next/link";
import Badge, { baseBadgeClasses } from "./Badge";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

function ProductCard(product: {
  id: string;
  title: string;
  href: string;
  price: number;
  imageSrc: string;
  type: AdsTypeOptions;
  envoi?: boolean;
}) {
  return (
    <div
      key={product.id}
      className="group relative border border-zinc-600 p-4 sm:p-6"
    >
      <div className="aspect-square overflow-hidden rounded-lg bg-zinc-600 group-hover:opacity-75">
        <img
          src={product.imageSrc}
          alt={product.title}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="pt-10 pb-4 text-center">
        <h3 className="text-sm font-medium">
          <Link href={product.href}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.title}
          </Link>
        </h3>
        <div>
          <Badge variant={product.type} />
        </div>
        <div>
          <SendBadge send={product.envoi} />
        </div>
        <div></div>
        <p className="mt-4 text-base font-medium">{product.price} EUR</p>
      </div>
    </div>
  );
}

function SendBadge(props: { send?: boolean }) {
  return (
    <span
      className={cn(baseBadgeClasses, {
        "bg-red-200 text-red-800": !props.send,
        "bg-green-200 text-green-800": props.send,
      })}
    >
      {props.send ? (
        <CheckIcon className="h-5 w-5" />
      ) : (
        <XMarkIcon className="h-5 w-5" />
      )}
      <span>Envoi</span>
    </span>
  );
}

export default ProductCard;
