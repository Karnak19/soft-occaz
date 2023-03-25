import { AdsTypeOptions } from "$/utils/pocketbase-types";
import Link from "next/link";

const types = Object.values(AdsTypeOptions);

function Navbar() {
  return (
    <ul className="flex gap-2 capitalize">
      <li>
        <Link href="/ads">Tous</Link>
      </li>
      {types.map((type) => (
        <li key={type}>
          <Link href={`/ads/${type}`}>{type}</Link>
        </li>
      ))}
      <li>
        <Link href="/ads/create">Créer</Link>
      </li>
    </ul>
  );
}

export default Navbar;
