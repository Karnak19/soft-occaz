import type { SVGProps } from 'react';
import Link from 'next/link';

export const footerNavigation = {
  main: [
    { name: 'Informations Légales', href: '/privacy-policy' },
    { name: 'CGU', href: '/privacy-policy' },
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
      name: 'Twitter/X',
      href: 'https://x.com/bazbazeso',
      icon: (props: SVGProps<SVGSVGElement>) => (
        <svg
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-muted/50 py-4 lg:pl-52">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 sm:flex sm:justify-between lg:px-8">
        <nav className="sm:flex sm:gap-3" aria-label="Footer">
          {footerNavigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <Link
                prefetch={false}
                href={item.href}
                className="text-sm leading-6 text-foreground hover:text-black dark:hover:text-white"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className="flex gap-2">
          {footerNavigation.social.map((item) => (
            <a key={item.name} href={item.href} className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">{item.name}</span>
              <item.icon className="size-6" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
      <p className="mt-10 pl-4 text-xs leading-5 text-muted-foreground">&copy; 2024 Airsoft Market. Tous droits réservés.</p>
    </footer>
  );
}
