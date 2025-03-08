import Image from 'next/image';

import SearchForm from '../SearchForm';

function SearchSection() {
  return (
    <div className="relative min-h-[500px] w-full">
      <Image
        placeholder="empty"
        fill
        src="/banner.jpg"
        alt="banner"
        className="absolute inset-0 size-full object-cover object-top"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/80 to-black/20" />

      <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center gap-8 px-6 py-16 text-center lg:px-8">
        <div className="max-w-3xl">
          <h1 className="font-brand text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Trouvez votre prochain équipement d&apos;airsoft
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/80">
            Des milliers d&apos;annonces d&apos;équipements d&apos;airsoft d&apos;occasion. Trouvez la réplique ou
            l&apos;équipement de vos rêves parmi notre large sélection.
          </p>
        </div>

        <div className="flex w-full max-w-xl items-start gap-8">
          <div className="flex-1 rounded-xl bg-white/10 p-4 backdrop-blur-lg sm:p-6">
            <SearchForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
