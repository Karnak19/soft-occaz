import { DocumentPlusIcon } from '@heroicons/react/24/outline';
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
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <Image className="h-11" width={44} height={44} src="/logo.png" alt="Your Company" />
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Vendez votre équipement d&apos;airsoft d&apos;occasion.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-muted-foreground">
            <DocumentPlusIcon className="inline-block w-8 h-8 mr-2 -mt-1" aria-hidden="true" />
            Créez votre annonce, ajoutez une description, des photo, un prix et publiez-la en quelques clics.
          </p>
          <p className="mx-auto mt-6 max-w-xl text-gray-600 dark:text-muted-foreground">
            Trouvez et vendez du matériel d&apos;airsoft d&apos;occasion de qualité sur notre marketplace dédiée. Achetez et
            échangez des répliques, des accessoires et des équipements pour des parties d&apos;airsoft palpitantes.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button variant="default" asChild>
              <Link href="/sign-up">S&apos;inscrire</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/annonces" className="font-semibold leading-6">
                Voir les annonces <span aria-hidden="true">→</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="-m-2 rounded-xl bg-muted-foreground/5 p-2 ring-1 ring-inset ring-muted-foreground/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                src="/hero4.jpg"
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
