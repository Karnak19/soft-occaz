import Image from 'next/image';

import { cn } from '$/utils/cn';

import banner from '../../../public/banner.jpg';
import SearchForm from '../SearchForm';

function SearchSection({ withoutBg }: { withoutBg?: boolean }) {
  return (
    <div
      className={cn('relative grid py-40 place-items-center', {
        'py-0': withoutBg,
      })}
    >
      {!withoutBg && (
        <Image
          placeholder="empty"
          fill
          src={banner}
          alt="banner"
          className="absolute inset-0 object-cover object-top w-full h-full opacity-90"
        />
      )}

      <div className="w-full max-w-3xl px-8 py-16 rounded-lg shadow-lg md:p-16 bg-rg-900/60 backdrop-blur-md">
        <h1 className="mb-4 text-2xl font-bold text-white">Rechercher une annonce</h1>
        <SearchForm />
      </div>
    </div>
  );
}

export default SearchSection;
