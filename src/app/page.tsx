import Link from 'next/link';

export default async function Home() {
  return (
    <div>
      <h1>hello world</h1>

      <Link href="/ads">Ads</Link>
    </div>
  );
}
