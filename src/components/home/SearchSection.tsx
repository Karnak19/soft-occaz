import Image from 'next/image';

import banner from '../../../public/banner.jpg';
import Button from '../Button';

function SearchSection() {
  return (
    <div className="relative grid py-40 place-items-center">
      <Image
        placeholder="empty"
        fill
        src={banner}
        alt="banner"
        className="absolute inset-0 object-cover object-top w-full h-full opacity-25"
      />

      <div className="w-full max-w-3xl px-8 py-16 rounded-lg shadow-lg md:p-16 bg-slate-800/60 backdrop-blur-md">
        <h1 className="text-2xl font-bold">Rechercher une annonce</h1>
        <div className="flex gap-4 mt-4">
          <input type="text" className="flex-1 p-2 border rounded-md border-slate-300" placeholder="Rechercher une annonce" />
          <Button>Rechercher</Button>
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
