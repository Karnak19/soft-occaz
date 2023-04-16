import Image from 'next/image';

import { cn } from '$/utils/cn';

import banner from '../../../public/banner.jpg';
import SearchForm from '../SearchForm';

function SearchSection({ withoutBg }: { withoutBg?: boolean }) {
  return (
    <div
      className={cn('relative grid place-items-center py-40', {
        'py-0': withoutBg,
      })}
    >
      {!withoutBg && (
        <Image
          placeholder="empty"
          fill
          src={banner}
          alt="banner"
          className="absolute inset-0 h-full w-full object-cover object-top opacity-90"
        />
      )}

      <div className="w-full max-w-3xl rounded-lg bg-rg-darkest/60 px-8 py-16 shadow-lg backdrop-blur-md md:p-16">
        <h1 className="mb-4 text-2xl font-bold text-white">Rechercher une annonce</h1>
        <SearchForm />
      </div>
    </div>
  );
}

export default SearchSection;
