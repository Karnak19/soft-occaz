import ProductCard from "$/components/ProductCard";
import { pb } from "$/utils/pocketbase";
import { AdsResponse, Collections } from "$/utils/pocketbase-types";
import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <h1>hello world</h1>

      <Link href="/ads">Ads</Link>
    </div>
  );
}
