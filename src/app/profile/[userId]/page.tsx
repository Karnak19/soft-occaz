/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/

import ProductCard from '$/components/product/ProductCard';
import { prisma } from '$/utils/db';

import Aside from './Aside';

export default async function Example({ params }: { params: { userId: string } }) {
  const userWithListings = await prisma.user.findUniqueOrThrow({
    where: { id: params.userId },
    include: {
      Listing: { orderBy: { createdAt: 'desc' } },
    },
  });

  return (
    <>
      <div className="flex h-full">
        {/* Content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Main content */}
          <div className="flex flex-1 items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                <div className="flex">
                  <h1 className="flex-1 text-2xl font-bold text-gray-900">Annonces de {userWithListings.username}</h1>
                </div>

                {/* Tabs */}
                <div className="mt-3 sm:mt-2">
                  {/* <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                      Select a tab
                    </label>
                    <select
                      id="tabs"
                      name="tabs"
                      className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      defaultValue="Recently Viewed"
                    >
                      <option>Recently Viewed</option>
                      <option>Recently Added</option>
                      <option>Favorited</option>
                    </select>
                  </div> */}
                  <div className="hidden sm:block">
                    <div className="flex items-center border-b border-gray-200">
                      {/* <nav className="-mb-px flex flex-1 space-x-6 xl:space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                          <a
                            key={tab.name}
                            href={tab.href}
                            aria-current={tab.current ? 'page' : undefined}
                            className={cn(
                              tab.current
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                              'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
                            )}
                          >
                            {tab.name}
                          </a>
                        ))}
                      </nav> */}
                    </div>
                  </div>
                </div>

                {/* Gallery */}
                <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                  <h2 id="gallery-heading" className="sr-only">
                    Recently viewed
                  </h2>
                  <ul className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-5">
                    {userWithListings.Listing.map((ad) => (
                      <ProductCard
                        key={ad.id}
                        {...{
                          href: `/annonces/details/${ad.id}`,
                          ...ad,
                        }}
                      />
                    ))}
                    {/* {userWithListings.Listing.map((file) => (
                      <li key={file.title} className="relative">
                        <div
                          className={cn(
                            file.delivery
                              ? 'ring-2 ring-indigo-500 ring-offset-2'
                              : 'focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100',
                            'aspect-w-10 aspect-h-7 group block w-full overflow-hidden rounded-lg bg-gray-100',
                          )}
                        >
                          <img
                            src={file.images[0]}
                            alt=""
                            className={cn(file.delivery ? '' : 'group-hover:opacity-75', 'pointer-events-none object-cover')}
                          />
                          <button type="button" className="absolute inset-0 focus:outline-none">
                            <span className="sr-only">View details for {file.title}</span>
                          </button>
                        </div>
                        <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{file.title}</p>
                        <p className="pointer-events-none block text-sm font-medium text-gray-500">{file.price}</p>
                      </li>
                    ))} */}
                  </ul>
                </section>
              </div>
            </main>

            {/* Details sidebar */}
            <Aside user={userWithListings} />
          </div>
        </div>
      </div>
    </>
  );
}
