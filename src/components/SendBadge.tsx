import { cn } from "$/utils/cn";
import { TruckIcon } from "@heroicons/react/20/solid";
import { baseBadgeClasses } from "./Badge";

export function SendBadge(props: { send?: boolean }) {
  return (
    <span
      className={cn(baseBadgeClasses, {
        "bg-red-200 text-red-800": !props.send,
        "bg-green-200 text-green-800": props.send,
      })}
    >
      <TruckIcon className="mx-auto w-4 h-4 mr-1" aria-hidden="true" />
      <span>Envoi</span>
    </span>
  );
}
