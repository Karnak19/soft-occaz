import { Type } from '@prisma/client';
import Link from 'next/link';

const categories = Object.values(Type);

function CategoriesSection() {
  return (
    <div className="flex size-full flex-col items-center justify-center py-12">
      <div className="-mt-28 grid w-full grid-cols-2 gap-4 px-6 md:flex">
        {categories.map((category) => (
          <div
            key={category}
            className="relative flex size-full flex-col items-center justify-center rounded-md bg-rg-700/60 py-10 text-white backdrop-blur-md hover:bg-rg-900/90"
          >
            <Link href={`/annonces/${category.toLowerCase()}`} className="text-xl font-bold uppercase">
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
