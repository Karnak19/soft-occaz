import { ChatBubbleLeftEllipsisIcon, DocumentPlusIcon, ListBulletIcon, PencilSquareIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

import { cn } from '$/utils/cn';

const actions = [
  {
    icon: ListBulletIcon,
    name: 'Mes annonces',
    href: '/dashboard/annonces',
    iconForeground: 'text-violet-700',
    iconBackground: 'bg-violet-50',
  },
  {
    icon: DocumentPlusIcon,
    name: 'Créer une annonce',
    href: '/dashboard/annonces/new',
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
  },
  {
    icon: ChatBubbleLeftEllipsisIcon,
    name: 'Chats',
    href: '/dashboard/chats',
    iconForeground: 'text-violet-700',
    iconBackground: 'bg-violet-50',
  },
  {
    icon: PencilSquareIcon,
    name: 'Éditer mes informations',
    href: '#',
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
  },
];

function Page() {
  return (
    <section aria-labelledby="quick-links-title">
      <div className="overflow-hidden bg-gray-200 divide-y divide-gray-200 rounded-lg shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
        <h2 className="sr-only" id="quick-links-title">
          Quick links
        </h2>
        {actions.map((action, actionIdx) => (
          <div
            key={action.name}
            className={cn(
              actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
              actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
              actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
              actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
              'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-teal-500',
            )}
          >
            <div>
              <span className={cn(action.iconBackground, action.iconForeground, 'inline-flex rounded-lg p-3 ring-4 ring-white')}>
                <action.icon className="w-6 h-6" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <Link href={action.href} className="focus:outline-none">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  {action.name}
                </Link>
              </h3>
            </div>
            <span
              className="absolute text-gray-300 pointer-events-none right-6 top-6 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Page;
