import { BoltIcon, CubeIcon, RocketLaunchIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { CrosshairIcon } from 'lucide-react';
import Link from 'next/link';

import { cn } from '$/utils/cn';
import { ListingsTypeOptions } from '$/utils/pocketbase/pocketbase-types';

const featuredCategories = [
  {
    name: 'AEG',
    icon: BoltIcon,
    href: `/annonces/${ListingsTypeOptions.aeg.toLowerCase()}`,
    color: 'bg-blue-500 text-blue-50',
    hoverColor: 'group-hover:bg-blue-600',
  },
  {
    name: 'GBB',
    icon: RocketLaunchIcon,
    href: `/annonces/${ListingsTypeOptions.gbb.toLowerCase()}`,
    color: 'bg-purple-500 text-purple-50',
    hoverColor: 'group-hover:bg-purple-600',
  },
  {
    name: 'SNIPER',
    icon: CrosshairIcon,
    href: `/annonces/${ListingsTypeOptions.sniper.toLowerCase()}`,
    color: 'bg-green-500 text-green-50',
    hoverColor: 'group-hover:bg-green-600',
  },
  {
    name: 'GEAR',
    icon: CubeIcon,
    href: `/annonces/${ListingsTypeOptions.gear.toLowerCase()}`,
    color: 'bg-red-500 text-red-50',
    hoverColor: 'group-hover:bg-red-600',
  },
  {
    name: 'HPA',
    icon: SparklesIcon,
    href: `/annonces/${ListingsTypeOptions.hpa.toLowerCase()}`,
    color: 'bg-orange-500 text-orange-50',
    hoverColor: 'group-hover:bg-orange-600',
  },
];

export default function FeaturedCategories() {
  return (
    <div className="bg-card/95 backdrop-blur-sm py-6 -mt-12 rounded-xl shadow-xl mx-auto max-w-5xl z-10 relative px-4 border border-border/40">
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {featuredCategories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="flex flex-col items-center justify-center gap-3 p-3 rounded-lg group transition-all hover:bg-muted"
          >
            <div
              className={cn(
                'size-12 rounded-full flex items-center justify-center p-3 shadow-sm transition-colors',
                category.color,
                category.hoverColor,
              )}
            >
              <category.icon className="size-6" />
            </div>
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
