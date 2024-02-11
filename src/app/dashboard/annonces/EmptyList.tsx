import Link from 'next/link';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';

export default function EmptyList() {
  return (
    <Link
      href="/dashboard/annonces/new"
      className="relative block w-full rounded-b-lg border-2 border-dashed border-rg-300 bg-gray-100 p-12 text-center hover:border-rg-500 hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <DocumentPlusIcon className="mx-auto size-12 text-rg-500" />
      <span className="mt-2 block text-sm font-semibold text-rg-900">Créer une nouvelle annonce</span>
    </Link>
  );
}
