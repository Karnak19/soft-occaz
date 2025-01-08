import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function EmptyList() {
  return (
    <Link
      href="/dashboard/annonces/new"
      className="relative block w-full rounded-b-lg border-2 border-dashed border-primary bg-background p-12 text-center hover:border-primary hover:bg-card focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <DocumentPlusIcon className="mx-auto size-12 text-primary" />
      <span className="mt-2 block text-sm font-semibold text-foreground">Créer une nouvelle annonce</span>
    </Link>
  );
}
