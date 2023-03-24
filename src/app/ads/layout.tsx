import Badge, { baseBadgeClasses } from "$/components/Badge";
import { cn } from "$/utils/cn";
import { AdsTypeOptions } from "$/utils/pocketbase-types";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const types = Object.values(AdsTypeOptions);

  return (
    <div className="mt-20 grid md:grid-cols-[theme(width.64),1fr]">
      <div>
        <ul className="flex flex-col gap-2">
          <li>
            <Link href="/ads">
              <span
                className={cn(
                  baseBadgeClasses,
                  "bg-white uppercase text-gray-800 cursor-pointer py-2 px-6"
                )}
              >
                Tous
              </span>
            </Link>
          </li>
          {types.map((type) => (
            <li key={type}>
              <Link href={`/ads/${type}`}>
                <Badge variant={type} className="py-2 px-6 cursor-pointer" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>{children}</div>
    </div>
  );
}
