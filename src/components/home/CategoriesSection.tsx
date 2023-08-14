import { Type } from '@prisma/client';
import Link from 'next/link';

const categories = Object.values(Type);

function CategoriesSection() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-12">
      <div className="grid w-full grid-cols-2 gap-4 px-6 md:flex -mt-28">
        {categories.map((category) => (
          <div
            key={category}
            className="relative flex flex-col items-center justify-center w-full h-full py-10 text-white rounded-md hover:bg-rg-900/90 bg-rg-700/60 backdrop-blur-md"
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
