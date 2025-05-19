import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ListingsTypeOptions } from '$/utils/pocketbase/pocketbase-types';
import SearchForm from '../SearchForm';
import { Button } from '../ui/button';

function SearchSection() {
  return (
    <div className="relative min-h-[600px] w-full">
      <Image
        placeholder="empty"
        fill
        src="/banner.jpg"
        alt="banner"
        className="absolute inset-0 size-full object-cover object-center brightness-75"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

      <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center gap-8 px-6 py-16 text-center lg:px-8">
        <div className="max-w-3xl">
          <h1 className="font-brand text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Le marché d'occasion de l'airsoft en France
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/90">
            Des milliers d'annonces d'équipements d'airsoft d'occasion. Trouvez la réplique ou l'équipement de vos rêves parmi
            notre large sélection.
          </p>
        </div>

        <div className="flex w-full max-w-xl flex-col items-center gap-6">
          <div className="w-full rounded-xl bg-white/10 p-4 backdrop-blur-lg shadow-xl sm:p-6">
            <SearchForm />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`/annonces/${ListingsTypeOptions.aeg.toLowerCase()}`}>
              <Button variant="secondary" className="backdrop-blur-sm bg-white/20 hover:bg-white/30">
                AEG
              </Button>
            </Link>
            <Link href={`/annonces/${ListingsTypeOptions.gbb.toLowerCase()}`}>
              <Button variant="secondary" className="backdrop-blur-sm bg-white/20 hover:bg-white/30">
                GBB
              </Button>
            </Link>
            <Link href={`/annonces/${ListingsTypeOptions.gbbr.toLowerCase()}`}>
              <Button variant="secondary" className="backdrop-blur-sm bg-white/20 hover:bg-white/30">
                GBBR
              </Button>
            </Link>
            <Link href={`/annonces/${ListingsTypeOptions.sniper.toLowerCase()}`}>
              <Button variant="secondary" className="backdrop-blur-sm bg-white/20 hover:bg-white/30">
                Sniper
              </Button>
            </Link>
            <Link href="/annonces">
              <Button variant="secondary" className="backdrop-blur-sm bg-white/20 hover:bg-white/30 gap-2">
                <Search className="size-4" />
                Toutes les annonces
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
