import { usePathname } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { parseAsString, useQueryState } from 'nuqs';

export function useSearch() {
  const pathname = usePathname();
  const router = useRouter();

  const [q, setQ] = useQueryState(
    'q',
    parseAsString.withDefault('').withOptions({
      history: 'push',
      throttleMs: 1000,
      shallow: false,
    }),
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (pathname.includes('annonces')) {
      router.push(`?q=${q}`);
    } else {
      router.push(`/annonces?q=${q}`);
    }
  };

  return {
    q,
    setQ,
    handleSubmit,
  };
}
