import { ChatBubbleLeftRightIcon, ShieldExclamationIcon } from '@heroicons/react/20/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { User } from '@prisma/client';
import format from 'date-fns/format';
import fr from 'date-fns/locale/fr';

import Button from '$/components/Button';

function Aside({ user }: { user: User }) {
  const informations = {
    Inscription: format(user.createdAt, 'MMMM yyyy', {
      locale: fr,
    }),
    Email: user.email,
  };

  return (
    <aside className="hidden w-96 overflow-y-auto border-l border-gray-200 bg-white p-8 lg:block">
      <div className="space-y-6 pb-16">
        <div>
          {user.avatar && (
            <div className="w-full grid place-items-center overflow-hidden">
              <img src={user.avatar} alt="" className="rounded-lg" />
            </div>
          )}
          <div className="mt-4 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                <span className="sr-only">Details for </span>
                {user.username}
              </h2>
              {/* <p className="text-sm font-medium text-gray-500">{currentFile.size}</p> */}
            </div>
            <button
              type="button"
              className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <HeartIcon className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Favorite</span>
            </button>
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Information</h3>
          <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
            {Object.entries(informations).map(([key, value]) => (
              <div key={key} className="flex justify-between py-3 text-sm font-medium">
                <dt className="text-gray-500">{key}</dt>
                <dd className="whitespace-nowrap text-gray-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          {/* <ul className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
            {currentFile.sharedWith.map((person) => (
              <li key={person.id} className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <img src={person.imageUrl} alt="" className="h-8 w-8 rounded-full" />
                  <p className="ml-4 text-sm font-medium text-gray-900">{person.name}</p>
                </div>
                <button
                  type="button"
                  className="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Remove<span className="sr-only"> {person.name}</span>
                </button>
              </li>
            ))}
            <li className="flex items-center justify-between py-2">
              <button
                type="button"
                className="group -ml-1 flex items-center rounded-md bg-white p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400">
                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">Share</span>
              </button>
            </li>
          </ul> */}
        </div>
        <div className="flex gap-x-3">
          <Button type="button" className="flex-1 justify-center gap-x-1">
            <ChatBubbleLeftRightIcon className="w-5 h-5 " aria-hidden="true" />
            Chat
          </Button>
          <Button type="button" variant="secondary" className="flex-1 justify-center gap-x-1">
            <ShieldExclamationIcon className="w-5 h-5 " aria-hidden="true" />
            Report
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
