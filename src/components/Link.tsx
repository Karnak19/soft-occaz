import NextLink from 'next/link';
import { ComponentProps } from 'react';

import { cn } from '$/utils/cn';

import { baseButtonClasses } from './Button';

type LinkProps = {
  variant?: 'primary' | 'secondary' | 'tertiary';
  block?: boolean;
  className?: string;
} & ComponentProps<typeof NextLink>;

function Link({ variant = 'primary', block = false, className, children, ...rest }: LinkProps) {
  const blockObj = {
    'w-full': block,
  };

  const variants: {
    [key in NonNullable<LinkProps['variant']>]: string;
  } = {
    primary: cn([baseButtonClasses, 'bg-rg hover:bg-rg-dark focus:ring-rg text-white', blockObj, className]),
    secondary: cn([baseButtonClasses, 'bg-transparent hover:bg-rg/50 border-rg-lightest', blockObj, className]),
    tertiary: cn([baseButtonClasses, 'hover:bg-rg/50 hover:border-rg', blockObj, className]),
  };

  return (
    <NextLink className={variants[variant]} {...rest}>
      {children}
    </NextLink>
  );
}

export default Link;
