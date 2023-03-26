import Link from 'next/link';

import { getListAds } from '$/utils/getters/getListAds';
import { pb } from '$/utils/pocketbase';

async function LastAds() {
  const annonces = await getListAds({ perPage: 4 });

  return (
    <section aria-labelledby="trending-heading">
      <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:py-32 lg:px-8">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
          <h2 id="trending-heading" className="text-2xl font-bold tracking-tight text-slate-100">
            Dernières annonces
          </h2>
          <Link href="/annonces" className="hidden text-sm font-semibold text-sky-600 hover:text-sky-400 sm:block">
            Tout voir
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="relative mt-8">
          <div className="relative w-full overflow-x-auto">
            <ul className="inline-flex mx-4 space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0">
              {annonces.items.map((product) => (
                <li key={product.id} className="inline-flex flex-col w-64 text-center lg:w-auto">
                  <div className="relative group">
                    <div className="w-full overflow-hidden rounded-md bg-slate-200 aspect-square">
                      {!!product.images?.length && (
                        <img
                          src={pb.getFileUrl(product, product.images[0], {
                            thumb: '250x250',
                          })}
                          alt={product.title}
                          className="object-cover object-center w-full h-full group-hover:opacity-75"
                        />
                      )}
                    </div>
                    <div className="mt-6">
                      <h3 className="mt-1 font-semibold text-slate-300">
                        <a href={`/annonces/details/${product.id}`}>
                          <span className="absolute inset-0" />
                          {product.title}
                        </a>
                      </h3>
                      <p className="mt-1 text-slate-200">{product.price}€</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="px-4 mt-12 sm:hidden">
          <Link href="#" className="text-sm font-semibold text-sky-600 hover:text-sky-400">
            Tout voir
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LastAds;
