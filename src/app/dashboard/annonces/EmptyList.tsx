import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function EmptyList() {
  return (
    <Link
      href="/dashboard/annonces/new"
      className="relative block w-full bg-gray-100 rounded-b-lg border-2 border-dashed border-rg-light p-12 text-center hover:border-rg focus:outline-none focus:ring-2 hover:bg-white focus:ring-indigo-500 focus:ring-offset-2"
    >
      <DocumentPlusIcon className="mx-auto h-12 w-12 text-rg" />
      <span className="mt-2 block text-sm font-semibold text-rg-darkest">Créer une nouvelle annonce</span>
    </Link>
  );
}
