import { InstagramLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import type { SVGProps } from 'react';

const navigation = {
  main: [
    { name: 'À propos', href: '/about' },
    { name: 'Annonces', href: '/annonces' },
    { name: 'Parrainage', href: '/parrainage' },
    { name: "Conditions d'utilisation", href: '/terms' },
  ],
  categories: [
    { name: 'AEG', href: '/annonces/aeg' },
    { name: 'AEP', href: '/annonces/aep' },
    { name: 'GBBR', href: '/annonces/gbbr' },
    { name: 'GBB', href: '/annonces/gbb' },
    { name: 'HPA', href: '/annonces/hpa' },
    { name: 'Sniper', href: '/annonces/sniper' },
    { name: 'Shotgun', href: '/annonces/shotgun' },
    { name: 'Gear', href: '/annonces/gear' },
  ],
  features: [
    { name: 'Import depuis Airsoft-occasion', href: '/dashboard/annonces/new' },
    { name: 'Système de notation', href: '/about#ratings' },
    { name: 'Programme de parrainage', href: '/parrainage' },
    { name: 'Messagerie intégrée', href: '/about#messaging' },
    { name: 'Vérification des utilisateurs', href: '/about#verification' },
  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/people/Airsoft-Marketstore/61555490948439/',
      icon: (props: SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/airsoftmarketfr/',
      // @ts-expect-error
      icon: (props: SVGProps<SVGSVGElement>) => <InstagramLogoIcon className="size-4" aria-hidden="true" {...props} />,
    },
  ],
};

export { navigation as footerNavigation };

export default function Footer() {
  return (
    <footer className="mt-auto bg-muted">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold leading-6 text-foreground">Navigation</h3>
            <ul role="list" className="mt-6 space-y-4">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-6 text-foreground">Catégories</h3>
            <ul role="list" className="mt-6 space-y-4">
              {navigation.categories.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-6 text-foreground">Fonctionnalités</h3>
            <ul role="list" className="mt-6 space-y-4">
              {navigation.features.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-6 text-foreground">Suivez-nous</h3>
            <ul role="list" className="mt-6 space-y-4">
              {navigation.social.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="flex items-center text-sm leading-6 text-muted-foreground hover:text-foreground">
                    <item.icon className="mr-2 size-4" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-muted-foreground">
          &copy; {new Date().getFullYear()} Airsoft Market. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
