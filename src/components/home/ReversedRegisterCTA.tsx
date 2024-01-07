import { PresentationChartLineIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function CTA() {
  return (
    <div className="relative isolate overflow-hidden">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-300 dark:stroke-muted [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth={0} fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" />
      </svg>
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:flex-row-reverse lg:px-8 lg:py-10">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Un dashboard pour gérer vos annonces.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-muted-foreground">
            <PresentationChartLineIcon className="inline-block w-8 h-8 mr-1 -mt-1" aria-hidden="true" />
            Voyez vos annonces, vos messages et vos paramètres en un coup d&apos;oeil. Analysez vos statistiques et vos
            performances. Et bien plus encore.
          </p>
          <p className="mx-auto mt-6 max-w-xl text-gray-600 dark:text-muted-foreground"></p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button variant="default" asChild>
              <Link href="/sign-up">S&apos;inscrire</Link>
            </Button>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mr-10 lg:ml-0 lg:mt-0 lg:max-w-none lg:flex-none xl:mr-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="-m-2 rounded-xl bg-muted-foreground/5 p-2 ring-1 ring-inset ring-muted-foreground/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                src="/hero3.jpg"
                alt="App screenshot"
                width={2432}
                height={1442}
                className="w-[76rem] rounded-md shadow-2xl ring-1 ring-muted-foreground/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
