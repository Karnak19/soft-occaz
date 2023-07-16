'use client';

import Link from 'next/link';

import Spinner from '$/components/Spinner';
import { useGetChats } from '$/hooks/useGetChats';

function DashboardRecentChats() {
  const { data, isLoading } = useGetChats();

  return (
    <section aria-labelledby="recent-hires-title">
      <div className="relative overflow-hidden bg-white rounded-lg shadow">
        {isLoading && (
          <span className="absolute inset-0 grid place-items-center backdrop-blur-sm">
            <Spinner />
          </span>
        )}
        <div className="p-6">
          <h2 className="text-base font-medium text-gray-900" id="recent-hires-title">
            Chats
          </h2>
          <div className="flow-root mt-6 ">
            <ul className="-my-5 divide-y divide-gray-200">
              {data?.items.map((chat) => (
                <li key={chat.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">{/* <Avatar user={chat.otherUser} /> */}</div>
                    <div className="flex-1 min-w-0">
                      {/* <p className="text-sm font-medium text-gray-900 truncate">{chat.otherUser?.name}</p> */}
                      <p className="text-sm text-gray-500 truncate">{`@${chat.otherUser?.username}`}</p>
                    </div>
                    <div>
                      <Link
                        href={`/dashboard/chats?id=${chat.id}`}
                        className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <Link
              href="/dashboard/chats"
              className="flex items-center justify-center w-full px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              View all
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardRecentChats;
