import { useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

export function useSearch() {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const search = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (ref.current?.value) {
      router.push(`/annonces?q=${ref.current.value}`);
    }
  };

  return {
    ref,
    handleSubmit,
    defaultValue: search.get('q') || '',
  };
}
