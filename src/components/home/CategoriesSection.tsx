import Link from 'next/link';

import { AnnoncesTypeOptions } from '$/utils/pocketbase-types';

const categories = Object.values(AnnoncesTypeOptions);

function CategoriesSection() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-12">
      <div className="grid w-full grid-cols-2 gap-4 px-6 laptop:flex -mt-28">
        {categories.map((category) => (
          <div
            key={category}
            className="relative flex flex-col items-center justify-center w-full h-full py-10 rounded-md hover:bg-sky-500/90 bg-sky-500/60 backdrop-blur-md"
          >
            <Link href={`/annonces/${category}`} className="text-xl font-bold uppercase">
              <span aria-hidden="true" className="absolute inset-0" />
              {category}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesSection;
